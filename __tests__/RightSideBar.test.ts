import RightSideBar from "../components/RightSideBar.vue"
import { mount } from '@vue/test-utils'
import { test, expect } from 'vitest'

test("Test for RightSideBar showing download button", () => {
    let testMap = new Map()
    testMap.set("name", "Jane Doe")
    testMap.set("Age", "51")
    let exampleDetails = {
        text: "Download database",
        database: "mydb",
        type: "download"
    }
    const wrapper = mount(RightSideBar, {
        props: {
            title: "Hello",
            infoMap: testMap,
            details: exampleDetails
        }
    })
    expect(wrapper.text()).toContain("Jane Doe")
    expect(wrapper.text()).toContain("name")
    expect(wrapper.text()).toContain("51")
    expect(wrapper.text()).toContain("Hello")
    expect(wrapper.text()).toContain("51")
    expect(wrapper.html().includes("fa-solid fa-download")).toBeTruthy()
})
