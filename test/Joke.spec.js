import { mount } from '@vue/test-utils'
import Joke from '@/components/Joke.vue'

const data = {
  "error": false,
  "category": "Dark",
  "type": "single",
  "joke": "Foo.",
  "flags": {
    "nsfw": false,
    "religious": false,
    "political": false,
    "racist": false,
    "sexist": false
  },
  "id": 167,
  "lang": "en"
}

describe('Joke', () => {
  let wrapper = mount(Joke, {
    propsData: {
      data,
      active: true
    }
  })

  test('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })
  
  test("renders properly", () => {
    expect(wrapper.html()).toMatchSnapshot();
  })

  test("toggle is called when active prop changes", () => {
    const wrapper = mount(Joke, {
      propsData: {
        data,
        active: true
      }
    })

    const spyUpdate = jest.spyOn(wrapper.vm, 'toggle')

    wrapper.setProps({ active: false })

    wrapper.vm.$nextTick(() => {
      expect(spyUpdate).toHaveBeenCalled()
    })

    spyUpdate.mockReset()
  })

  test("toggle with true param shows joke words", () => {
    wrapper.vm.toggle(true)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.part').at(0).isVisible()).toBe(true)
    })
  })

  test("toggle with false param hides joke words", () => {
    wrapper.vm.toggle(false)

    wrapper.vm.$nextTick(() => {
      expect(wrapper.findAll('.part').at(0).isVisible()).toBe(false)
    })
  })

  test("renders \"Try again.\" text if joke text is empty", () => {
    data.joke = ''
    wrapper = mount(Joke, {
      propsData: {
        data,
        active: true
      }
    })
    expect(wrapper.text()).toContain('Try again.')
  })
})
