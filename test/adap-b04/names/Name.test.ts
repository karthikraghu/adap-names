import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { MethodFailedException } from "../../../src/adap-b04/common/MethodFailedException";

describe("StringName Contracts", () => {
    it("should throw IllegalArgumentException for invalid index in getComponent", () => {
        const name = new StringName("oss.cs.fau.de", ".");
        expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
        expect(() => name.getComponent(4)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component in append", () => {
        const name = new StringName("oss.cs.fau.de", ".");
        expect(() => name.append(null as any)).toThrow(IllegalArgumentException);
    });

    it("should satisfy postconditions for append", () => {
        const name = new StringName("oss.cs.fau.de", ".");
        const oldSize = name.getNoComponents();
        name.append("de");
        expect(name.getNoComponents()).toBe(oldSize + 1);
        expect(name.getComponent(oldSize)).toBe("de");
    });

    it("should throw IllegalArgumentException for invalid index in remove", () => {
        const name = new StringName("oss.cs.fau.de", ".");
        expect(() => name.remove(10)).toThrow(IllegalArgumentException);
    });
});

describe("StringArrayName Contracts", () => {
    it("should throw IllegalArgumentException for invalid index in getComponent", () => {
        const name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
        expect(() => name.getComponent(-1)).toThrow(IllegalArgumentException);
        expect(() => name.getComponent(4)).toThrow(IllegalArgumentException);
    });

    it("should throw IllegalArgumentException for null component in insert", () => {
        const name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
        expect(() => name.insert(0, null as any)).toThrow(IllegalArgumentException);
    });

    it("should satisfy postconditions for insert", () => {
        const name = new StringArrayName(["oss", "cs", "fau", "de"], ".");
        const oldSize = name.getNoComponents();
        name.insert(0, "www");
        expect(name.getNoComponents()).toBe(oldSize + 1);
        expect(name.getComponent(0)).toBe("www");
    });
});
