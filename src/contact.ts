import readlineSync from "readline-sync";

interface Contact {
    id: number;
    name: string;
    age: number;
    email: string;
}

const contacts: Contact[] = [];
let nextId = 1;

const listContacts = () => {
    console.log("\n=== Lista de Contatos ===");
    if (contacts.length === 0) {
        console.log("Nenhum contato cadastrado.");
        return;
    }
    contacts.forEach((contact) => {
        console.log(`${contact.id} - ${contact.name}, ${contact.age} anos - ${contact.email}`);
    });
};

const createContact = () => {
    const name = readlineSync.question("Digite um nome: ");
    const age = readlineSync.question("Digite uma idade: ");
    const email = readlineSync.question("Digite um email: ");

    if (!name || !age || !email) {
        console.log("Algum dado está incompleto!");
        return;
    }

    const addUser: Contact = {
        id: nextId++,
        name,
        age: parseInt(age),
        email,
    };

    contacts.push(addUser);

    console.log("Usuário cadastrado com sucesso!");
};

const putContact = () => {
    const idContact = readlineSync.questionInt("Digite o ID do usuário para alterar: ");
    const index = contacts.findIndex((contact) => contact.id === idContact);

    if (index === -1) {
        console.log("Esse usuário não existe!");
        return;
    }

    const name = readlineSync.question("Digite um novo nome: ");
    const age = readlineSync.question("Digite uma nova idade: ");
    const email = readlineSync.question("Digite um novo email: ");

    contacts[index] = {
        ...contacts[index],
        name: name || contacts[index].name,
        age: age ? parseInt(age) : contacts[index].age,
        email: email || contacts[index].email,
    };

    console.log("Usuário alterado com sucesso!");
};

const deleteContact = () => {
    const idToDelete = readlineSync.questionInt("Digite o ID do contato para deletar: ");
    const index = contacts.findIndex((contact) => contact.id === idToDelete);

    if (index === -1) {
        console.log("Não existe esse contato!");
        return;
    }

    const deletedContact = contacts.splice(index, 1);
    console.log(`Contato "${deletedContact[0].name}" deletado com sucesso!`);
};

let running = true;

while (running) {
    console.log(`
========================
        MENU
========================
1 - Listar contatos
2 - Criar contato
3 - Alterar contato
4 - Deletar contato
5 - Sair
`);

    const chosen = readlineSync.question("Escolha: ");

    switch (chosen) {
        case "1":
            listContacts();
            break;
        case "2":
            createContact();
            break;
        case "3":
            putContact();
            break;
        case "4":
            deleteContact();
            break;
        case "5":
            console.log("Encerrando...");
            running = false;
            break;
        default:
            console.log("Opção inválida!");
    }
}
