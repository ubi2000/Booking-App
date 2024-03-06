import { test, expect } from "@playwright/test";

const UI_URL = "http://localhost:5173";

test("should allow the user to sign in", async ({ page }) => {
  await page.goto(UI_URL);

  await page.getByRole("link", { name: "Sign In" }).click();
  // await expect(page.getByRole("heading",{name:"Sign In"})).toBeVisible()
  await page.locator("[name=email]").fill("vjvd@gmail.com");
  await page.locator("[name=password]").fill("testpass");
  await page.getByRole("button", { name: "Sign In" }).click();
  await expect(page.getByText("SignIn Successfull")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
test("should allow user to register", async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  // await page.getByRole("link", { name: "Create an Account" }).click();
  await expect(
    page.getByRole("heading", { name: "Create an Account" })
  ).toBeVisible();
  await page.locator("[name=firstName").fill("test_firstName");
  await page.locator("[name=lastName").fill("test_lastName");
  await page.locator("[name=email").fill("testRegister@g.com");
  await page.locator("[name=password").fill("testpass");
  await page.locator("[name=confirmPassword").fill("testpass");
  await page.getByRole("button",{name:"Create Account"}).click()
  await expect(page.getByText("Registered Successfully!")).toBeVisible();
  await expect(page.getByRole("link", { name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole("link", { name: "My Hotels" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Sign Out" })).toBeVisible();
});
