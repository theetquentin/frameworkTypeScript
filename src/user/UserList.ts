// va lister tous les utilisateurs
// utiliser la classe Collection pour les récupérer
// dans user buildUserCollection
// dans userEdit rajouter une troisième vue

import { Collection } from "../framework/Collection";
import { View } from "../framework/views/View";
import { User, UserProps } from "./User";

export class UserList extends View<User, UserProps> {
    selectedUserId: string = "";
    userCollection!: Collection<User, UserProps>;
    onUserSelect!: (user: User) => void;

    initialize(userCollection: Collection<User, UserProps>, onUserSelect: (user: User) => void) {
        this.userCollection = userCollection;
        this.onUserSelect = onUserSelect;
        this.userCollection.fetch(); // charger les users
        this.model.save()
    }

    template() {
        return `
            <div>
                <div>User List:</div>
                <select class="user-select">
                    ${this.renderOptions()}
                </select>
            </div>
        `;
    }

    renderOptions() {
        return this.userCollection.models.map(user => {
            return `<option value="${this.model.get('id')}">${this.model.get('name')}</option>`;
        }).join('');
    }

    eventsMap(): { [key: string]: () => void } {
        return {
            'change:.user-select': this.onUserChange
        };
    }

    onUserChange = () => {
        const selectElement = this.parent.querySelector('.user-select') as HTMLSelectElement;
        this.selectedUserId = selectElement.value;

        // recup l'id
        const selectedUser = this.userCollection.models.find(user => user.get('id') === this.selectedUserId);
        if (selectedUser) {
            this.onUserSelect(selectedUser);
        }
    }
}

