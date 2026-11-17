import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir:'./tests',timeout:45000,expect:{timeout:10000},workers:1,
  use:{baseURL:process.env.TEST_BASE_URL||'http://127.0.0.1:3000',browserName:'chromium',headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})},
});
