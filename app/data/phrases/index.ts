import type { Phrase } from '~/types/content'
import { directions as directionsEn } from './fr-en/directions'
import { meeting as meetingEn } from './fr-en/meeting'
import { opinion as opinionEn } from './fr-en/opinion'
import { phone as phoneEn } from './fr-en/phone'
import { restaurant as restaurantEn } from './fr-en/restaurant'
import { shopping as shoppingEn } from './fr-en/shopping'
import { smallTalk as smallTalkEn } from './fr-en/small-talk'
import { travel as travelEn } from './fr-en/travel'
import { directions as directionsEs } from './fr-es/directions'
import { meeting as meetingEs } from './fr-es/meeting'
import { opinion as opinionEs } from './fr-es/opinion'
import { phone as phoneEs } from './fr-es/phone'
import { restaurant as restaurantEs } from './fr-es/restaurant'
import { shopping as shoppingEs } from './fr-es/shopping'
import { smallTalk as smallTalkEs } from './fr-es/small-talk'
import { travel as travelEs } from './fr-es/travel'

export const phrases: Phrase[] = [
  ...directionsEn,
  ...restaurantEn,
  ...smallTalkEn,
  ...meetingEn,
  ...opinionEn,
  ...phoneEn,
  ...travelEn,
  ...shoppingEn,
  ...directionsEs,
  ...restaurantEs,
  ...smallTalkEs,
  ...meetingEs,
  ...opinionEs,
  ...phoneEs,
  ...travelEs,
  ...shoppingEs
]
