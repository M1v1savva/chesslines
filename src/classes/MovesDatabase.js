import { sendCommentRequest, sendMovesRequest } from './ServerRequests.js'

export class MovesDatabase {

    constructor(
        moveseq_to_moves = {},
        moveseq_to_comment = {},
        current_moveseq = '',
        can_save = false,
        edit_on = false,
        token = null
    ) {
        this.moveseq_to_moves = moveseq_to_moves
        this.moveseq_to_comment = moveseq_to_comment
        this.current_moveseq = current_moveseq
        this.can_save = can_save
        this.edit_on = edit_on
        this.token = token
    }

    copy() {
        return new MovesDatabase(
            this.moveseq_to_moves,
            this.moveseq_to_comment,
            this.current_moveseq,
            this.can_save,
            this.edit_on,
            this.token
        )
    }

    update(history) {
        this.current_moveseq = history.join(' ')
        this.calculate_save_availability()
        this.edit_on = false
    }

    is_edit_on() {
        return this.edit_on
    }

    set_edit_on(new_val) {
        return this.edit_on = new_val
    }

    is_save_available() {
        return this.can_save
    }

    calculate_save_availability() {
        const spl = this.current_moveseq.split(' ')
        var current_moves = ''
        if (this.current_moveseq == '') {
            this.can_save = false
            return
        }

        var flag = false
        for (var i = 0; i < spl.length; i++) {
            if (!this.check_in_moves(current_moves, spl[i]))
                flag = true
            
            if (current_moves != '')
                current_moves += ' '
            current_moves += spl[i]
        }
        this.can_save = flag
    }

    check_in_moves(key, move) {
        if ((key in this.moveseq_to_moves) && (this.moveseq_to_moves[key].includes(move))) {
            return true
        }
        return false
    }

    save_moves() {
        this.update_moves()
        this.can_save = false
        sendMovesRequest(this.current_moveseq, this.token)
    }

    update_moves() {
        const spl = this.current_moveseq.split(' ')
        var current_moves = ''

        for (var i = 0; i < spl.length; i++) {    
            if (!this.check_in_moves(current_moves, spl[i])) {
                if (!(current_moves in this.moveseq_to_moves)) {
                    this.moveseq_to_moves[current_moves] = []
                }
                this.moveseq_to_moves[current_moves].push(spl[i])
            }
            
            if (current_moves != '')
                current_moves += ' '
            current_moves += spl[i]
        }
    }

    get_moves() {
        if (this.current_moveseq in this.moveseq_to_moves) {
            return this.moveseq_to_moves[this.current_moveseq]
        } else {
            return []
        }
    }

    get_comment() {
        if (this.current_moveseq in this.moveseq_to_comment) {
            return this.moveseq_to_comment[this.current_moveseq]
        } else {
            return ''
        }
    }

    set_comment(new_comment) {
        this.moveseq_to_comment[this.current_moveseq] = new_comment               
        sendCommentRequest(this.current_moveseq, new_comment, this.token)
    }

    setToken(token) {
        this.token = token
    }
}