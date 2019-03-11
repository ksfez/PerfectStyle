export default class User {
	_id: String;
	name: String;
	mail: String;
	password: String;
	role: String;
	branch: Number; //depends on the branches table
	img: String;
	created_at: Date;
	updated_at: Date;

  constructor() {
  }
}
