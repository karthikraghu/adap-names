import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected readonly components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        // Defensive copy to ensure immutability
        this.components = [...source];
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

    public setComponent(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        // Create new array with updated component
        let newComponents = [...this.components];
        newComponents[i] = c;
        return new StringArrayName(newComponents, this.delimiter);
    }

    public insert(i: number, c: string): Name {
        IllegalArgumentException.assert(i >= 0 && i <= this.getNoComponents(), "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.getNoComponents();
        let newComponents = [...this.components];
        newComponents.splice(i, 0, c);
        let result = new StringArrayName(newComponents, this.delimiter);
        
        MethodFailedException.assert(result.getNoComponents() === oldNoComponents + 1, "Postcondition failed: component count did not increase");
        MethodFailedException.assert(result.getComponent(i) === c, "Postcondition failed: component not inserted correctly");
        
        return result;
    }

    public append(c: string): Name {
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.getNoComponents();
        let newComponents = [...this.components, c];
        let result = new StringArrayName(newComponents, this.delimiter);
        
        MethodFailedException.assert(result.getNoComponents() === oldNoComponents + 1, "Postcondition failed: component count did not increase");
        MethodFailedException.assert(result.getComponent(oldNoComponents) === c, "Postcondition failed: component not appended correctly");
        
        return result;
    }

    public remove(i: number): Name {
        IllegalArgumentException.assert(i >= 0 && i < this.getNoComponents(), "Index out of bounds");
        
        let oldNoComponents = this.getNoComponents();
        let newComponents = [...this.components];
        newComponents.splice(i, 1);
        let result = new StringArrayName(newComponents, this.delimiter);
        
        MethodFailedException.assert(result.getNoComponents() === oldNoComponents - 1, "Postcondition failed: component count did not decrease");
        
        return result;
    }

}
