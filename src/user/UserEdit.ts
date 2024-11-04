import { Collection } from "../framework/Collection";
import { View } from "../framework/views/View";
import { User, UserProps } from "./User";
import { UserForm } from "./UserForm";
import { UserList } from "./UserList";
import { UserShow } from "./UserShow";

export class UserEdit extends View<User, UserProps> {



    regionsMap(): { [key: string]: string; } {
        return {
            userList: '.user-list',
            userShow: '.user-show',
            userForm: '.user-form'
        }
    }

    template(): string {
        return `
        <div>
            <div class="user-list"></div>
            <div class="user-show"></div>
            <div class="user-form"></div>
        </div>
        `
    }

    onUserSelect = (user: User) => {
        const idUser = user.get("id");
        if(idUser){
            this.model.set({"id":idUser});
            new UserShow(this.regions.userShow, this.model).render(); // Mettre à jour la vue UserShow
        }
    }

    onRender(): void {

        // appel à la collection
        const userCollection = new Collection<User, UserProps>(
            'http://localhost:3001/users',
            (json: UserProps) => User.build(json)
        )

        const userList = new UserList(this.regions.userList, this.model)
        userList.initialize(userCollection, this.onUserSelect)
        userList.render()

        new UserShow(this.regions.userShow, this.model).render()
        new UserForm(this.regions.userForm, this.model).render()
    }
}