import {stadiums} from './stadiums.js';
import {teams} from './teams.js';
import {Match} from "@domain/entities/Match";
import {MatchStatus} from "@domain/entities/MatchStatus";
import {MatchStage} from "@domain/entities/MatchStage";

export const matchs = [
  new Match(1, teams[0], teams[1], stadiums[0], MatchStatus.SCHEDULED, MatchStage.FINAL, new Date('2026-07-19')),
  new Match(2, teams[2], teams[3], stadiums[1], MatchStatus.LIVE, MatchStage.SEMI_FINALS, new Date('2026-07-14')),
  new Match(3, teams[4], teams[5], stadiums[2], MatchStatus.FINISHED, MatchStage.QUARTERS_FINALS, new Date('2026-07-10'))
];



