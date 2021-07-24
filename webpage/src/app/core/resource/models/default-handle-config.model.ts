interface CrudData {
    create: string | null;
    update: string | null;
    delete?: string | null;
}

export interface DefaultHandleConfig {
    messages: CrudData;
    error: CrudData;
    modal?: {
        title: string
    };
}
