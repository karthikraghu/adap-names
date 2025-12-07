import { Node } from "./Node";
import { ServiceFailureException } from "../common/ServiceFailureException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public hasChildNode(cn: Node): boolean {
        return this.childNodes.has(cn);
    }

    public addChildNode(cn: Node): void {
        this.childNodes.add(cn);
    }

    public removeChildNode(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {
        const result: Set<Node> = new Set<Node>();
        
        try {
            // Check if this directory matches
            if (this.getBaseName() === bn) {
                result.add(this);
            }
            
            // Recursively search all child nodes
            for (const child of this.childNodes) {
                const childResults = child.findNodes(bn);
                childResults.forEach(node => result.add(node));
            }
        } catch (ex) {
            if (ex instanceof InvalidStateException) {
                throw new ServiceFailureException("Service failed during node search", ex);
            }
            throw ex;
        }
        
        return result;
    }

}