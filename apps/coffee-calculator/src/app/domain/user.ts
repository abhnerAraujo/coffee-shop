
export interface UserProps {
  id: string;
  name: string;
  picture: string;
}

export class User {
  private constructor(private props: UserProps) {
  }

  static create(props: UserProps) {
    return new User(props);
  }

  static restore(props: UserProps) {
    return new User(props);
  }

  getId() {
    return this.props.id;
  }

  getName() {
    return this.props.name;
  }

  getPicture() {
    return this.props.picture;
  }

  toJson() {
    return this.props;
  }
 
}