export class User {
    id: string;
    nom: string;
    admin: boolean;

    constructor(options: {
        id?: string,
        nom?: string,
        admin?: boolean
    } = {}) {
        this.id = options.id;
        this.nom = options.nom;
        this.admin = options.admin;
    }
}
