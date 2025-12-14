import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public abstract clone(): Name;

    public asString(delimiter: string = this.delimiter): string {
        let result: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            result.push(this.getComponent(i));
        }
        return result.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        let result: string[] = [];
        for (let i = 0; i < this.getNoComponents(); i++) {
            let component = this.getComponent(i);
            let escaped = '';
            for (let j = 0; j < component.length; j++) {
                let c = component.charAt(j);
                if (c === DEFAULT_DELIMITER || c === ESCAPE_CHARACTER) {
                    escaped += ESCAPE_CHARACTER;
                }
                escaped += c;
            }
            result.push(escaped);
        }
        return result.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Name): boolean {
        if (this.delimiter !== other.getDelimiterCharacter()) {
            return false;
        }
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public abstract getNoComponents(): number;

    public abstract getComponent(i: number): string;
    
    public abstract setComponent(i: number, c: string): Name;

    public abstract insert(i: number, c: string): Name;
    
    public abstract append(c: string): Name;
    
    public abstract remove(i: number): Name;

    public concat(other: Name): Name {
        IllegalArgumentException.assert(other != null, "other name must not be null");
        let result: Name = this.clone();
        for (let i = 0; i < other.getNoComponents(); i++) {
            result = result.append(other.getComponent(i));
        }
        return result;
    }

}
