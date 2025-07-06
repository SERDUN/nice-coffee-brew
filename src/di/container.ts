import { AwilixContainer, asClass, asFunction, asValue, createContainer, InjectionMode } from "awilix";

type Scope = 'singleton' | 'scoped' | 'transient';

type ClassModule = { class: any; scope: Scope };
type FunctionModule = { token: string; use: 'function'; value: (...args: any[]) => any; scope?: Scope };
type ValueModule = { token: string; use: 'value'; value: any };

export type ModuleRegistration = ClassModule | FunctionModule | ValueModule;

export function registerModules(
    container: AwilixContainer,
    modules: ModuleRegistration[]
) {
    for (const mod of modules) {
        if ("class" in mod) {
            let registration = asClass(mod.class);
            if (mod.scope === "singleton") registration = registration.singleton();
            else if (mod.scope === "scoped") registration = registration.scoped();
            else if (mod.scope === "transient") registration = registration.transient();
            container.register({[classToKey(mod.class)]: registration});
        } else if (mod.use === "function") {
            //
            let registration = asFunction(mod.value);
            if (mod.scope === "singleton") registration = registration.singleton();
            else if (mod.scope === "scoped") registration = registration.scoped();
            else if (mod.scope === "transient") registration = registration.transient();
            container.register({[mod.token]: registration});
        } else if (mod.use === "value") {
            container.register({[mod.token]: asValue(mod.value)});
        }
    }
}

function classToKey(cls: Function): string {
    return cls.name.charAt(0).toLowerCase() + cls.name.slice(1);
}

export const container = createContainer({injectionMode: InjectionMode.CLASSIC});
