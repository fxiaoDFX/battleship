export default function createShip(length = 0) {
    if (length <= 0) return null
    return {
        length,
        timesHit: 0,
        sunk: false,

        hit(num) {
            if (!num) this.timesHit++
            else this.timesHit += num
        },

        isSunk() {
            return this.timesHit >= length
        },

        getHits() {
            return this.timesHit
        },
    }
}
