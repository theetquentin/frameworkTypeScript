import { Collection } from "./framework/Collection";
import { User, UserProps } from "./user/User";
import { UserEdit } from "./user/UserEdit";

const rootElement = document.getElementById('root')
const john = User.build({name: 'JOHN', age: 20})

// console.log(john.getAllProps())

const userCollection = new Collection<User, UserProps>(
    'http://localhost:3001/users',
    (json: UserProps) => User.build(json)
);

userCollection.fetch();
console.log(userCollection.models);


// for (let i = 0; i < userCollection.models.length; i++) {
//     const user = userCollection.models[i];
//     const name = user.get('name');
//     const age = user.get('age');
//     console.log(`Nom: ${name}, Âge: ${age}`);
// }

if(rootElement){
    const userEdit = new UserEdit(rootElement, john)
    userEdit.render()
    // console.log(userEdit);
    
}