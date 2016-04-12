import * as types from '../constants/ActionTypes'

export function startGame(size) {
	return { type: types.START_GAME, size }
}