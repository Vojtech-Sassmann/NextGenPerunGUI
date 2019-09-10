import {Component, HostBinding, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../../../core/models/User';
import {UsersService} from '../../../../../../core/services/api/users.service';
import {Facility} from '../../../../../../core/models/Facility';
import {FacilityService} from '../../../../../../core/services/api/facility.service';
import {Member} from '../../../../../../core/models/Member';
import {MembersService} from '../../../../../../core/services/api/members.service';
import {ServiceService} from '../../../../../../core/services/api/service.service';
import {ResourcesService} from '../../../../../../core/services/api/resources.service';
import {GroupService} from '../../../../../../core/services/api/group.service';
import {Group} from '../../../../../../core/models/Group';
import {Resource} from '../../../../../../core/models/Resource';
import {VoService} from '../../../../../../core/services/api/vo.service';
import {Service} from '../../../../../../core/models/Service';
import {RichDestination} from '../../../../../../core/models/RichDestination';
import * as shape from 'd3-shape';
import {Subject} from 'rxjs';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user-destination-graph',
  templateUrl: './user-destination-graph.component.html',
  styleUrls: ['./user-destination-graph.component.scss']
})
export class UserDestinationGraphComponent implements OnInit {

  @HostBinding('class.router-component') true;

  constructor(private route: ActivatedRoute,
              private userService: UsersService,
              private facilityService: FacilityService,
              private memberService: MembersService,
              private serviceService: ServiceService,
              private resourceService: ResourcesService,
              private groupService: GroupService,
              private voService: VoService,
              private translate: TranslateService) { }

  user: User;
  destination: string;
  service: string;
  membership: Member[];
  facilities: Facility[];

  idCounter = 0;
  isConnected = false;
  loading = true;

  hierarchialGraph = {nodes: [], links: []};
  curve = shape.curveBundle;
  zoomToFit$: Subject<boolean> = new Subject();
  innerWidth: any;
  innerHeight: any;

  localUser: string;
  localVo: string;
  localGroup: string;
  localResource: string;
  localFacility: string;
  localService: string;
  localDestination: string;

  ngOnInit() {
    if (window.innerWidth < 600) {
      this.innerWidth = window.innerWidth;
    } else {
      this.innerWidth = window.innerWidth - 420;
    }
    this.innerHeight = window.innerHeight;
    this.getLocalizedNames();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.destination = params['destination'];
      this.service = params['service'];
      this.userService.getUserById(params['user']).subscribe(user => {
        this.user = user;
        this.facilityService.getFacilitiesByDestination(this.destination).subscribe( facilities => {
          this.facilities = facilities;
          this.memberService.getMembersByUser(this.user.id).subscribe(membership => {
            this.membership = membership;
            if (this.membership.length === 0 || this.facilities.length === 0) {
              this.loading = false;
              this.isConnected = false;
              return;
            }
            this.showGraph();
          });
        });
      });
    });
  }

  showGraph() {
    const nodeId1 = '' + this.id();
    const nodeLabel1 = this.user.firstName + ' ' + this.user.lastName;
    const nodeTooltip1 = this.localUser;
    const tip1 = 'user: ' + this.user.id;
    const nodeUser = {
      id: nodeId1,
      label: nodeLabel1,
      tooltip: nodeTooltip1,
      color: '#FFFFCC',
      tip: tip1
    };
    this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeUser];

    const nodeId2 = '' + this.id();
    const tip2 = 'destination no id';
    if (this.service === 'noService') {
      const nodeLabel2 = this.destination;
      const nodeTooltip2 = this.localDestination + ': ' + this.destination;
      const nodeDestination = {
        id: nodeId2,
        label: nodeLabel2,
        tooltip: nodeTooltip2,
        color: '#E0E0E0',
        tip: tip2
      };
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeDestination];

    } else {
      const nodeLabel2 = this.service + ': ' + this.destination;
      const nodeTooltip2 = this.localService + ': ' +  this.service + ', ' + this.localDestination + ': ' + this.destination;
      const nodeDestination = {
        id: nodeId2,
        label: nodeLabel2,
        tooltip: nodeTooltip2,
        color: '#E0E0E0',
        tip: tip2
      };
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeDestination];
    }

    for (const facility of this.facilities) {
      this.serviceService.getAllRichDestinations(facility.id).subscribe(destinations => {
        this.connectToService(facility, destinations);
        this.delay(2000).then(any => {
          this.zoomToFit$.next(true);
          this.loading = false;
        });
      });
    }
  }

  connectToService(facility: Facility, destinations: RichDestination[]) {
    if (this.isConnectedToService(destinations)) {
      this.facilityService.getAssignedResources(facility.id).subscribe(connectedResources => {
        for (let i = 0; i < this.membership.length; i++) {
          this.connectToGroups(facility, this.membership[i], connectedResources);
        }
      });
    }
  }

  connectToGroups(facility: Facility, member: Member, connectedResources: Resource[]) {
    this.facilityService.getAllowedGroups(facility.id, member.voId).subscribe(allowedGroups => {
      if (allowedGroups.length !== 0) {
        this.groupService.getMemberGroups(member.id).subscribe(memberGroups => {
          const connectedGroups: Group[] = this.findConnectedGroups(allowedGroups, memberGroups);
          if (connectedGroups.length !== 0) {
            for (const group of connectedGroups) {
              this.connectToResource(facility, group, connectedResources);
            }
          }
        });
      }

    });
  }

  connectToResource(facility: Facility, group: Group, connectedResources: Resource[]) {
    this.resourceService.getAssignedResources(group.id).subscribe(assignedResources => {
      const resources: Resource[] = this.findConnectedResources(assignedResources, connectedResources);
      for (const resource of resources) {
        this.resourceService.getAssignedServices(resource.id).subscribe(assignedServices => {
          if (this.haveService(assignedServices)) {
            this.isConnected = true;
            this.addNodesToGraph(group.voId, group, resource, facility);                        // add nodes and links
          }
        });
      }
    });
  }

  addNodesToGraph(voId: number, group: Group, resource: Resource, facility: Facility) {
    if (this.findEntityInGraph('Facility: ' + facility.id) === -1) {
      const nodeId3 = '' + this.id();
      const nodeLabel3 = this.localFacility + ': '  + facility.name;
      const nodeTooltip3 = facility.description;
      const tip3 = 'Facility: ' + facility.id;
      const nodeFacility = {
        id: nodeId3,
        label: nodeLabel3,
        tooltip: nodeTooltip3,
        color:  '#FFCCFF',
        tip: tip3
      };
      this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeFacility];

      const linkDest = {
        source: nodeId3,
        target: this.hierarchialGraph.nodes[this.findEntityInGraph('destination no id')].id};
      this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkDest];
    }

    this.voService.getVoById(voId).subscribe(vo => {
      if (this.findEntityInGraph('Vo: ' + vo.id) === -1) {
        const nodeIdV = '' + this.id();
        const nodeLabelV = this.localVo + ': ' + vo.shortName;
        const nodeTooltipV = vo.name;
        const tipV = 'Vo: ' + vo.id;
        const nodeV = {
          id: nodeIdV,
          label: nodeLabelV,
          tooltip: nodeTooltipV,
          color: '#E5FFCC',
          tip: tipV
        };
        this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeV];

        const linkV = {
          source: this.hierarchialGraph.nodes[this.findEntityInGraph('user: ' + this.user.id)].id,
          target: nodeIdV};
        this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkV];
      }

      if (this.findEntityInGraph('Group: ' + group.id) === -1) {
        const nodeIdG = '' + this.id();
        const nodeLabelG = this.localGroup + ': ' + group.name;
        const nodeTooltipG = group.description;
        const tipG = 'Group: ' + group.id;
        const nodeG = {
          id: nodeIdG,
          label: nodeLabelG,
          tooltip: nodeTooltipG,
          color: '#CCE5FF',
          tip: tipG
        };
        this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeG];

        const linkG = {
          source: this.hierarchialGraph.nodes[this.findEntityInGraph('Vo: ' + vo.id)].id,
          target: nodeIdG};
        this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkG];

      }

      const duplicate: number = this.findEntityInGraph('Resource: ' + resource.id);
      if (duplicate !== -1) {
        const linkR = {
          source: this.hierarchialGraph.nodes[this.findEntityInGraph('Group: ' + group.id)].id,
          target: this.hierarchialGraph.nodes[duplicate].id};
        this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkR];

      } else {
        const nodeIdR = '' + this.id();
        const nodeLabelR = this.localResource + ': ' + resource.name;
        const nodeTooltipR = resource.description;
        const tipR = 'Resource: ' + resource.id;
        const nodeR = {
          id: nodeIdR,
          label: nodeLabelR,
          tooltip: nodeTooltipR,
          color: '#FFCCCC',
          tip: tipR
        };

        this.hierarchialGraph.nodes = [...this.hierarchialGraph.nodes, nodeR];

        const linkR = {
          source: this.hierarchialGraph.nodes[this.findEntityInGraph('Group: ' + group.id)].id,
          target: nodeIdR};
        this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkR];

        const linkF = {
          source: nodeIdR,
          target: this.hierarchialGraph.nodes[this.findEntityInGraph('Facility: ' + facility.id)].id};
        this.hierarchialGraph.links = [...this.hierarchialGraph.links, linkF];
      }
    });
  }

  haveService(assignedServices: Service[]): boolean {
    if (this.service === 'noService') {
      return true;
    }
    for (const service of assignedServices) {
      if (this.service === service.name) {
        return true;
      }
    }
    return false;
  }

  findConnectedGroups(groups1: Group[], groups2: Group[]): Group[] {
    const result: Group[] = [];
    for (let i = 0; i < groups1.length; i++) {
      for (let j = 0; j < groups2.length; j++) {
        if (groups1[i].id === groups2[j].id) {
          result.push(groups1[i]);
        }
      }
    }
    return result;
  }

  findConnectedResources(r1: Resource[], r2: Resource[]): Resource[] {
    const result: Resource[] = [];
    for (let i = 0; i < r1.length; i++) {
      for (let j = 0; j < r2.length; j++) {
        if (r1[i].id === r2[j].id) {
          result.push(r1[i]);
        }
      }
    }
    return result;
  }

  findEntityInGraph(id: string): number {
    for (let i = 0; i < this.hierarchialGraph.nodes.length; i++) {
      if (this.hierarchialGraph.nodes[i].tip === id) {
        return i;
      }
    }
    return -1;
  }

  isConnectedToService(destinations: RichDestination[]): boolean {
    for (const potentialDestination of destinations) {
      if (potentialDestination.destination === this.destination) {
        if (potentialDestination.service.name === this.service || this.service === 'noService') {
          return true;
        }
      }
    }
    return false;
  }

  id(): number {
    this.idCounter++;
    return this.idCounter;
  }

  async delay(ms: number) {
    await new Promise(resolve => setTimeout(() => resolve(), ms)).then(() => console.log('fired'));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    if (window.innerWidth < 600) {
      this.innerWidth = window.innerWidth;
    } else {
      this.innerWidth = window.innerWidth - 420;
    }
    this.innerHeight = window.innerHeight;
  }

  getLocalizedNames() {
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.USER').subscribe( text => {
      this.localUser = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.VO').subscribe( text => {
      this.localVo = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.GROUP').subscribe( text => {
      this.localGroup = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.RESOURCE').subscribe( text => {
      this.localResource = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.FACILITY').subscribe( text => {
      this.localFacility = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.SERVICE').subscribe( text => {
      this.localService = text;
    });
    this.translate.get('ADMIN.VISUALIZER.USER_DESTINATION.DESTINATION').subscribe( text => {
      this.localDestination = text;
    });
  }

}
