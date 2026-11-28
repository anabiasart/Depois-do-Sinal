// Shared contracts for the gradual migration; legacy saves remain JSON-compatible.
export type CharacterId = 'dante' | 'soren' | 'theo' | 'ezra' | 'valentim' | 'raven';
export type DayPhase = 'Manhã' | 'Tarde' | 'Noite';
export type ReputationTrait = 'cooperação' | 'criatividade' | 'autonomia';
export type SocialChoice = 0 | 1 | 2;

export interface SocialState {
    bonds: Record<string, number>;
    reputation: Record<ReputationTrait, number>;
    resolved: Record<string, SocialChoice>;
}

export interface SocialEvent {
    id: string;
    pair: [CharacterId, CharacterId];
    title: string;
    text: string;
    choices: [string, string, string];
    trait: ReputationTrait;
    loc: string;
    lines: [string, string];
    outcomes: [string, string, string];
}

export interface SaveState {
    name: string;
    node: string;
    episode?: number;
    living16?: SocialState;
}
