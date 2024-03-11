import { Role } from '@prisma/client';

const allRoles = {
  [Role.AGENCY]: [],
  [Role.MANAGER]: [],
  [Role.TALENT]: [],
  [Role.AGENCYMANAGER]: [],
  [Role.USER]: [],
  [Role.ADMIN]: ['getUsers', 'manageUsers', 'getAgencies', 'managerAgencies', 'getManagers', 'manageManagers', 'getTalents', 'manageTalents', 'getAgencyManagers', 'manageAgencyManagers']
};

export const roles = Object.keys(allRoles);
export const roleRights = new Map(Object.entries(allRoles));
