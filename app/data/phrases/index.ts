import type { Phrase } from '~/types/content'
import { directions } from './directions'
import { meeting } from './meeting'
import { opinion } from './opinion'
import { phone } from './phone'
import { restaurant } from './restaurant'
import { shopping } from './shopping'
import { smallTalk } from './small-talk'
import { travel } from './travel'

export const phrases: Phrase[] = [
  ...directions,
  ...restaurant,
  ...smallTalk,
  ...meeting,
  ...opinion,
  ...phone,
  ...travel,
  ...shopping
]
