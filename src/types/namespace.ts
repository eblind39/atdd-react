import { isExternalModule } from 'typescript';

// Before compilation
namespace NamespaceIdentifier {
    class PrivateClassIdentifier { }

    export class PublicClassIdentifier {}
}