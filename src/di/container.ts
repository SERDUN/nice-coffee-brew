import { createContainer, asClass, InjectionMode, AwilixContainer } from 'awilix';
import { modules } from "./modules.js";


export const container = createContainer({injectionMode: InjectionMode.CLASSIC});
registerModules(container, modules);

export function registerModules(container: AwilixContainer, modules: Array<{ class: any, scope: string }>) {
    for (const {class: Klass, scope} of modules) {
        const key = classToKey(Klass);
        let registration;
        switch (scope) {
            case 'singleton':
                registration = asClass(Klass).singleton();
                break;
            case 'scoped':
                registration = asClass(Klass).scoped();
                break;
            case 'transient':
                registration = asClass(Klass).transient();
                break;
            default:
                throw new Error(`Unknown scope: ${scope}`);
        }
        container.register({[key]: registration});
    }
}

function classToKey(cls: Function): string {
    return cls.name.charAt(0).toLowerCase() + cls.name.slice(1);
}
