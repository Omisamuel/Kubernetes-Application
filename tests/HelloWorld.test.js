// tests/HelloWorld.test.js
import { mount } from "@vue/test-utils";
import { describe, it, expect } from "vitest";
import HelloWorld from "@/components/HelloWorld.vue"; // Adjust the path based on your project structure

describe("HelloWorld Component", () => {
  it("renders props.msg when passed", () => {
    const wrapper = mount(HelloWorld, {
      props: { msg: "Hello Vitest" },
    });
    expect(wrapper.text()).toContain("Hello Vitest");
  });
});
