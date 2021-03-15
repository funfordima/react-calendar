import { Members } from '../interfaces';

const mapMembers = (members: Members[]): string[] => members.map(({ name }: Members) => name);

export default mapMembers;
