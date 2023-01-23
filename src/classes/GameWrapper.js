import Chess from './chess';
import { MovesDatabase } from './MovesDatabase'

export class GameWrapper {

    constructor(
        game = new Chess(),
        activeMove = -1, 
        moveParam = [],
        currentHistory = [],
    ) {
        this.game = game
        this.activeMove = activeMove
        this.moveParam = moveParam
        this.currentHistory = currentHistory
    }

    copy() {
        return new GameWrapper(
            this.game,
            this.activeMove,
            this.moveParam,
            this.currentHistory
        )
    }

    get(props) {
        return this.game.get(props)
    }

    fen() {
        return this.game.fen()
    }

    moves({square, verbose}) {
        return this.game.moves({square, verbose})
    }

    move({from, to, promotion}) {
        const return_value = this.game.move({from, to, promotion})
        if (return_value != null) {
            while (this.moveParam.length > this.activeMove + 1)
                this.moveParam.pop()
            this.activeMove += 1
            this.moveParam.push({from, to, promotion})
            this.currentHistory = this.game.history()
        }
        return return_value
    }

    move_notation(notation) {
        const return_value = this.game.move(notation)
        if (return_value != null) {
            while (this.moveParam.length > this.activeMove + 1)
                this.moveParam.pop()
            this.activeMove += 1
            this.moveParam.push(notation)
            this.currentHistory = this.game.history()
        }
        return return_value
    }

    make_move(param) {
        if (typeof param == 'string')
            this.move_notation(param)
        else
            this.move(param)
    }

    jump_to_move(move_id) {
        while (this.activeMove < move_id) {
            this.activeMove += 1
            this.make_move(this.moveParam[this.activeMove])
        }

        while (this.activeMove > move_id) {
            this.activeMove -= 1
            this.game.undo()
        }
    }

    left() {
        if (this.activeMove != -1) {
            this.activeMove -= 1
            this.game.undo()
        }
    }

    hard_left() {
        while (this.activeMove != -1) {
            this.activeMove -= 1
            this.game.undo()
        }
    }

    right() {
        var last = this.moveParam.length - 1
        if (this.activeMove != last) {
            this.activeMove += 1
            this.make_move(this.moveParam[this.activeMove])
        }
    }

    hard_right() {
        var last = this.moveParam.length - 1
        while (this.activeMove != last) {
            this.activeMove += 1
            this.make_move(this.moveParam[this.activeMove])
        }
    }

    get_full_history() {
        return { moves: this.currentHistory, activeMove: this.activeMove }
    }

    get_history() {
        return this.game.history()
    }
}
