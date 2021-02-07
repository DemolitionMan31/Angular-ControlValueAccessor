import {Component, ContentChild, EventEmitter, forwardRef, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {NgSelectComponent} from '@ng-select/ng-select';
/* Le provider NG_VALUE_ACCESSOR  spécifie une classe qui implémente l'interface ControlValueAccessor
 * et est utilisée par Angular pour configurer la synchronisation avec formControl
 */
export const DEFAULT_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SelectorComponent),
    multi: true
};

@Component({
    selector: 'app-selector',
    templateUrl: './selector.component.html',
    styleUrls: ['./selector.component.css'],
    providers: [DEFAULT_VALUE_ACCESSOR]
})
export class SelectorComponent implements OnInit, ControlValueAccessor {
    // Composant ng-select.
    @ViewChild(NgSelectComponent) ngSelectComponent: NgSelectComponent;
    // Permet au composant parent de donner un child (template ...) au composant. Celui-ci doit avoir l'id #optionTemplate
    @ContentChild('optionTemplate') optionTemplate: TemplateRef<any> = null;
    // Permet au composant parent de donner un child (template ...) au composant. Celui-ci doit avoir l'id #labelTemplate.
    @ContentChild('labelTemplate') labelTemplate: TemplateRef<any> = null;
    // EventEmitter qui permet de notifier le parent à chaque modification de la valeur.
    @Output() public change: EventEmitter<any> = new EventEmitter<any>();
    // EventEmitter qui permet de notifier le parent à chaque fois que le user clic sur l'icône clear.
    @Output() public clear: EventEmitter<void> = new EventEmitter<void>();
    // Liste des items à afficher.
    @Input() public items: any[];
    // Fermeture du menu lorsqu'une valeur est sélectionnée.
    @Input() public closeOnSelect: boolean = true;
    // Boolean qui indique si la croix pour tout supprimer apparait ou non.
    @Input() public clearable: boolean = false;
    // Boolean qui indique si on peut faire plusieur choix ou non.
    @Input() public multiple: boolean = false;
    // Boolean qui indique si l'on peut écrire dans le textfield pour chercher un item.
    @Input() public searchable: boolean = true;
    // Nom de l'attribut à afficher par item.
    @Input() public bindLabel: string;
    // Nombre maximum d'items selectionnés affichés.
    @Input() public maxNumberDisplays: number = 2;
    // Définir un texte personnalisé lorsque le filtre renvoie un résultat vide
    @Input() public notFoundText: string = 'No items found';
    // Text affiché sans sélection
    @Input() public placeholder: string = '';
    // Durée minimale du terme pour démarrer une recherche. Doit être utilisé avec la tête de frappe
    @Input() public minTermLength: number = 0;
    // Si les éléments doivent être filtrés au début de la composition
    @Input() public searchWhileComposing: boolean = true;
    // Marque le premier élément comme focalisé lors de l'ouverture / du filtrage.
    @Input() public markFirst: boolean = true;
    // Attribut qui contiendra l'item ou la liste des items selectionnés.
    public selectedItems: any = '';
    // Boolean qui indique si le composant est disabled.
    public disabled: boolean = false;

    /** Sinature de la méthode que va donner le formControl qui permettra de mettre à jour le model dans le controller. */
    onChange: (obj: any) => void;
    /**
     *  Sinature de la méthode que va donner le formControl qui permettra d'indiquer au controler quand il y a
     * une intéraction avec le composant.
     */
    onTouch: () => void;

    constructor() {
    }

    ngOnInit(): void {
        console.log("init selector" + this.items.length);

    }

    // get accessor
    get value(): any {
        return this.selectedItems;
    }

    // set accessor including call the onchange callback
    set value(pValue: any) {
        if (pValue !== undefined && pValue !== this.selectedItems) {
            this.selectedItems = pValue;
            this.onChange(pValue);
            this.onTouch();
        }
    }

    /** La writeValueméthode est utilisée par formControl pour définir la valeur sur le formControl natif. */
    public writeValue(pValue: any): void {
        if (pValue !== undefined && pValue !== this.selectedItems) {
            this.selectedItems = pValue;
        }
    }

    /**
     * La méthode registerOnChange est utilisée par formControl pour enregistrer un callback qui devrait
     *  être déclenché chaque fois que le formControl natif est mis à jour.
     */
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    /**
     * La méthode registerOnTouched est utilisée pour indiquer qu'un utilisateur a interagi avec le composant (click dessus)
     * Ce qui notifie le formControl du dessus et valide le formulaire si il y à un Validators dessus.
     */
    public registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

}
