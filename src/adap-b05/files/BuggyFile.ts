import { File } from "./File";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";

export class BuggyFile extends File {

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    /**
     * Fault injection for homework
     * @returns base name, here always ""
     */
    protected doGetBaseName(): string {
        this.baseName = "";
        const result = super.doGetBaseName();
        
        // Throw exception if basename is corrupted (empty)
        InvalidStateException.assert(result !== "", "Invalid state: basename is empty");
        
        return result;
    }

}
