import {RichMember} from '../core/models/RichMember';
import {User} from '../core/models/User';
import {RichUser} from '../core/models/RichUser';
import {Attribute} from '../core/models/Attribute';
import {Owner} from '../core/models/Owner';


/**
 * Return string representing Material icon for status of given member.
 *
 * @param richMember member
 */
export function parseStatusIcon(richMember: RichMember): string {
  switch (richMember.status) {
    case 'VALID':
      return 'verified_user';
    case 'INVALID':
      return 'report';
    case 'SUSPENDED':
      return 'lock';
    case 'EXPIRED':
      return 'schedule';
    case 'DISABLED':
      return 'delete';
  }
}

/**
 * Return color which should be used for icon of given member's status.
 *
 * @param richMember member
 */
export function parseStatusColor(richMember: RichMember): string {
  switch (richMember.status) {
    case 'VALID':
      return 'accent';
    case 'INVALID':
      return 'warn';
    default:
      return '';
  }
}

/**
 * Gets email of given member. The vo-email has top priority, the preferred email
 * has lower priority. If there are no emails, an empty string is returned.
 *
 * @param richMember member
 */
export function parseEmail(richMember: RichMember): string {
  let email = '';
  richMember.memberAttributes.forEach(attr => {
    if (attr.friendlyName === 'mail' && attr.value !== null) {
      email = attr.value;
    }
  });

  if (email.length === 0) {
    richMember.userAttributes.forEach(attr => {
      if (attr.friendlyName === 'preferredMail') {
        email = attr.value;
      }
    });
  }

  return email;
}

/**
 * Get logins of given member.
 *
 * @param richMember member
 */
export function parseLogins(richMember: RichMember|RichUser): string {
  let logins = '';

  richMember.userAttributes.forEach(attr => {
    if (attr.baseFriendlyName === 'login-namespace') {
      logins += attr.friendlyNameParameter + ': ' + attr.value + ' ';
    }
  });

  if (logins.endsWith(' ')) {
    logins = logins.substring(0, logins.length - 1);
  }
  return logins;
}

export function parseUrnsToUrlParam(paramName: string, urns: string[]): string {
  let attributesParam = '';
  urns.forEach(a => attributesParam = attributesParam.concat(`&${paramName}%5B%5D=`).concat(a));
  return attributesParam;
}

/**
 * Creates full name for given user form his titles and names.
 *
 * @param user user
 */
export function parseFullName(user: User): string {
  let fullName = '';

  if (user.titleBefore !== null) {
    fullName += user.titleBefore + ' ';
  }
  if (user.firstName !== null) {
    fullName += user.firstName + ' ';
  }
  if (user.middleName !== null) {
    fullName += user.middleName + ' ';
  }
  if (user.lastName !== null) {
    fullName += user.lastName + ' ';
  }
  if (user.titleAfter !== null) {
    fullName += user.titleAfter + ' ';
  }
  if (fullName.endsWith(' ')) {
    fullName = fullName.substring(0, fullName.length - 1);
  }

  return fullName;
}

/**
 * Returns attribute with specific urn from given rich user.
 * If the given user doesn't have attribute with given urn, null is returned.
 *
 * @param user user with attributes
 * @param urn urn for required attribute
 */
export function getRichUserAttribute(user: RichUser, urn: string): Attribute {
  for (const attribute of user.userAttributes) {
    const attributeUrn = attribute.namespace + ':' + attribute.friendlyName;
    if (attributeUrn === urn) {
      return attribute;
    }
  }

  return null;
}

export function parseTechnicalOwnersNames(owners: Owner[]): string {
  let names = '';
  for (const owner of owners) {
    if (owner.type === 'technical') {
      names += owner.name + ', ';
    }
  }
  if (names.endsWith(', ')) {
    names = names.substring(0, names.length - 2);
  }
  return names;
}

export async function doAfterDelay(delayMs: number, callback: () => void) {
  await delay(delayMs);
  callback();
}

export function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Returns array with recently used entities at the top of array.
 *
 * @param key of localStorage
 * @param array of all entities
 */
export function getRecentlyVisited(key: string, array: any[]): any[] {
  const recentId: number[] = JSON.parse(localStorage.getItem(key));
  if (recentId) {
    const recentlyVisited: any[] = [];
    for (let i = 0; i < recentId.length; i ++) {
      array.forEach((item, index) => {
        if (item.id === recentId[i]) {
          recentlyVisited.push(item);
          array.splice(index, 1);
        }
      });
    }
    for (let i = recentlyVisited.length - 1; i >= 0; i--) {
      array.unshift(recentlyVisited[i]);
    }
  }
  return array;
}


/**
 * Add entity that was just visited to localStorage.
 *
 * @param key of localStorage
 * @param item entity that was visited
 */
export function addRecentlyVisited(key: string, item: any) {
  if (localStorage.getItem(key) === null) {
    // if user not have any in local storage
    const recent: number[] = [];
    recent.unshift(item.id);
    localStorage.setItem('vos', JSON.stringify(recent));
  } else {
    const recent: number[] = JSON.parse(localStorage.getItem(key));
    const index = indexOfVo(recent, item.id);
    if (index > 0) {
      // if vo is in recent but not of first place, then we remove it to placed it first
      recent.splice(index, 1);
    }
    if (index !== 0) {
      // place the element as first
      recent.unshift(item.id);
    }
    if (recent.length > 5) {
      // pop last element if length exceed 5 vo
      recent.pop();
    }
    localStorage.setItem(key, JSON.stringify(recent));
  }
}

export function indexOfVo(recent: number[], id: number) {
  for (let i = 0; i < recent.length; i++) {
    if (recent[i] === id) {
      return i;
    }
  }
  return -1;
}

