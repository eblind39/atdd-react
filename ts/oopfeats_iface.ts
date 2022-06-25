import { isExternalModule } from "typescript";

interface IBase {
    id: number | undefined;
}

interface IDerivedFromBase extends IBase {
    name: string | undefined;
}

class InterfaceInheritanceClass implements IDerivedFromBase {
    id: number | undefined;
    name: string | undefined;
}

// class inheritance
class BaseClass implements IBase {
    id: number | undefined;
}

class DerivedFromBaseClass extends BaseClass implements IDerivedFromBase {
    name: string | undefined;
}

// Implement many interfaces
interface IFirstInterface {
    id: number | undefined;
}

interface ISecondInterface {
    name: string | undefined;
}

class MultipleInheritance implements IFirstInterface, ISecondInterface {
    id: number | undefined;
    name: string | undefined;
}