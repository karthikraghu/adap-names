import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        this.components = [...source];
    }

    public checkInvariant(): void {
        InvalidStateException.assert(this.components != null, "components must not be null");
    }

    public clone(): Name {
        return new StringArrayName(this.components, this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");
        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i <= this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.getNoComponents();
        this.components.splice(i, 0, c);
        
        MethodFailedException.assert(this.getNoComponents() === oldNoComponents + 1, "Postcondition failed: component count did not increase");
        MethodFailedException.assert(this.getComponent(i) === c, "Postcondition failed: component not inserted correctly");
    }

    public append(c: string) {
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.getNoComponents();
        this.components.push(c);
        
        MethodFailedException.assert(this.getNoComponents() === oldNoComponents + 1, "Postcondition failed: component count did not increase");
        MethodFailedException.assert(this.getComponent(oldNoComponents) === c, "Postcondition failed: component not appended correctly");
    }

    public remove(i: number) {
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        
        let oldNoComponents = this.getNoComponents();
        this.components.splice(i, 1);
        
        MethodFailedException.assert(this.getNoComponents() === oldNoComponents - 1, "Postcondition failed: component count did not decrease");
    }

}