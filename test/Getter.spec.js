import { getters } from "@/store/jokes.js"

const list = [
  {
    "error": false,
    "category": "Pun",
    "type": "single",
    "joke": "I bought some shoes from a drug dealer. I don't know what he laced them with, but I was tripping all day!",
    "flags": {
      "nsfw": false,
      "religious": false,
      "political": false,
      "racist": false,
      "sexist": false
    },
    "id": 206,
    "lang": "en",
    "isSaved": true
  },
  {
    "error": false,
    "category": "Programming",
    "type": "twopart",
    "setup": "Why do programmers prefer using the dark mode?",
    "delivery": "Because light attracts bugs.",
    "flags": {
      "nsfw": true,
      "religious": false,
      "political": false,
      "racist": false,
      "sexist": false
    },
    "id": 235,
    "lang": "en"
  }
]
const state = { list }

describe("saved", () => {
  test("return saved", () => {
    const actual = getters.saved(state)
    expect(actual).toEqual([ list[0] ])
  })
})
