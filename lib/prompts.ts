import pkg from "enquirer";
import { exmampleAnswers, InterFont } from "../exampleData";
import { Address, AnswersSchema, Settings, Theme } from "../schema";
import { fetchGoogleFonts } from "./fonts";

const states = new Map([
  ["Alabama", "AL"],
  ["Alaska", "AK"],
  ["Arizona", "AZ"],
  ["Arkansas", "AR"],
  ["American Samoa", "AS"],
  ["California", "CA"],
  ["Colorado", "CO"],
  ["Connecticut", "CT"],
  ["Delaware", "DE"],
  ["District of Columbia", "DC"],
  ["Florida", "FL"],
  ["Georgia", "GA"],
  ["Guam", "GU"],
  ["Hawaii", "HI"],
  ["Idaho", "ID"],
  ["Illinois", "IL"],
  ["Indiana", "IN"],
  ["Iowa", "IA"],
  ["Kansas", "KS"],
  ["Kentucky", "KY"],
  ["Louisiana", "LA"],
  ["Maine", "ME"],
  ["Maryland", "MD"],
  ["Massachusetts", "MA"],
  ["Michigan", "MI"],
  ["Minnesota", "MN"],
  ["Mississippi", "MS"],
  ["Missouri", "MO"],
  ["Montana", "MT"],
  ["Nebraska", "NE"],
  ["Nevada", "NV"],
  ["New Hampshire", "NH"],
  ["New Jersey", "NJ"],
  ["New Mexico", "NM"],
  ["New York", "NY"],
  ["North Carolina", "NC"],
  ["North Dakota", "ND"],
  ["Northern Mariana Islands", "MP"],
  ["Ohio", "OH"],
  ["Oklahoma", "OK"],
  ["Oregon", "OR"],
  ["Pennsylvania", "PA"],
  ["Puerto Rico", "PR"],
  ["Rhode Island", "RI"],
  ["South Carolina", "SC"],
  ["South Dakota", "SD"],
  ["Tennessee", "TN"],
  ["Texas", "TX"],
  ["Trust Territories", "TT"],
  ["Utah", "UT"],
  ["Vermont", "VT"],
  ["Virginia", "VA"],
  ["Virgin Islands", "VI"],
  ["Washington", "WA"],
  ["West Virginia", "WV"],
  ["Wisconsin", "WI"],
  ["Wyoming", "WY"],
]);

export async function gatherAnswers() {
  const { prompt } = pkg;

  // const fontSpinner = ora("Fetching Google Web Fonts...").start();
  let fontMap: Map<string, string>;
  try {
    fontMap = await fetchGoogleFonts();
    // fontSpinner.succeed("✅ Google Web Fonts successfully loaded");
  } catch {
    // await console.error(err);
    // fontSpinner.warn(
    //   "Could not fetch Google Web Fonts. Using defaults instead...",
    // );
    fontMap = new Map([
      [
        "Inter",
        JSON.stringify({
          family: "Inter",
          variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "latin",
            "latin-ext",
            "vietnamese",
          ],
          version: "v20",
          lastModified: "2025-09-10",
          files: {
            "100":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyeMZhrib2Bg-4.ttf",
            "200":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyfMZhrib2Bg-4.ttf",
            "300":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuOKfMZhrib2Bg-4.ttf",
            "500":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fMZhrib2Bg-4.ttf",
            "600":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYMZhrib2Bg-4.ttf",
            "700":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuFuYMZhrib2Bg-4.ttf",
            "800":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuDyYMZhrib2Bg-4.ttf",
            "900":
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuBWYMZhrib2Bg-4.ttf",
            regular:
              "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf",
            "100italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc2dphjZ-Ek-7MeA.ttf",
            "200italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcWdthjZ-Ek-7MeA.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTch9thjZ-Ek-7MeA.ttf",
            italic:
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc2dthjZ-Ek-7MeA.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTc69thjZ-Ek-7MeA.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcB9xhjZ-Ek-7MeA.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcPtxhjZ-Ek-7MeA.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTcWdxhjZ-Ek-7MeA.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/inter/v20/UcCM3FwrK3iLTcvneQg7Ca725JhhKnNqk4j1ebLhAm8SrXTccNxhjZ-Ek-7MeA.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/inter/v20/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZlhjQ.ttf",
        }),
      ],
      [
        "Roboto",
        JSON.stringify({
          family: "Roboto",
          variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "latin",
            "latin-ext",
            "math",
            "symbols",
            "vietnamese",
          ],
          version: "v51",
          lastModified: "2026-02-19",
          files: {
            "100":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbGmTggvWl0Qn.ttf",
            "200":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZEbWmTggvWl0Qn.ttf",
            "300":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuaabWmTggvWl0Qn.ttf",
            "500":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWub2bWmTggvWl0Qn.ttf",
            "600":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYaammTggvWl0Qn.ttf",
            "700":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuYjammTggvWl0Qn.ttf",
            "800":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZEammTggvWl0Qn.ttf",
            "900":
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWuZtammTggvWl0Qn.ttf",
            regular:
              "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbWmTggvWl0Qn.ttf",
            "100italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLoHRiA_0klQnx24.ttf",
            "200italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLgHQiA_0klQnx24.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLt_QiA_0klQnx24.ttf",
            italic:
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLoHQiA_0klQnx24.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLrPQiA_0klQnx24.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLl_XiA_0klQnx24.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLmbXiA_0klQnx24.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLgHXiA_0klQnx24.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/roboto/v51/KFOKCnqEu92Fr1Mu53ZEC9_Vu3r1gIhOszmOClHrs6ljXfMMLijXiA_0klQnx24.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/roboto/v51/KFOMCnqEu92Fr1ME7kSn66aGLdTylUAMQXC89YmC2DPNWubEbVmSiA8.ttf",
        }),
      ],
      [
        "Playfair Display",
        JSON.stringify({
          family: "Playfair Display",
          variants: [
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: ["cyrillic", "latin", "latin-ext", "vietnamese"],
          version: "v40",
          lastModified: "2025-09-11",
          files: {
            "500":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKd3vUDQZNLo_U2r.ttf",
            "600":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKebukDQZNLo_U2r.ttf",
            "700":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKeiukDQZNLo_U2r.ttf",
            "800":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfFukDQZNLo_U2r.ttf",
            "900":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKfsukDQZNLo_U2r.ttf",
            regular:
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvUDQZNLo_U2r.ttf",
            italic:
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_qiTbtbK-F2rA0s.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_pqTbtbK-F2rA0s.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_naUbtbK-F2rA0s.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_k-UbtbK-F2rA0s.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_iiUbtbK-F2rA0s.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFRD-vYSZviVYUb_rj3ij__anPXDTnCjmHKM4nYO7KN_gGUbtbK-F2rA0s.ttf",
          },
          category: "serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/playfairdisplay/v40/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDRbtY.ttf",
        }),
      ],
      [
        "Lato",
        JSON.stringify({
          family: "Lato",
          variants: [
            "100",
            "100italic",
            "300",
            "300italic",
            "regular",
            "italic",
            "700",
            "700italic",
            "900",
            "900italic",
          ],
          subsets: ["latin", "latin-ext"],
          version: "v25",
          lastModified: "2025-09-16",
          files: {
            "100":
              "https://fonts.gstatic.com/s/lato/v25/S6u8w4BMUTPHh30wWyWrFCbw7A.ttf",
            "300":
              "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh7USew-FGC_p9dw.ttf",
            "700":
              "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh6UVew-FGC_p9dw.ttf",
            "900":
              "https://fonts.gstatic.com/s/lato/v25/S6u9w4BMUTPHh50Xew-FGC_p9dw.ttf",
            "100italic":
              "https://fonts.gstatic.com/s/lato/v25/S6u-w4BMUTPHjxsIPy-vNiPg7MU0.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/lato/v25/S6u_w4BMUTPHjxsI9w2PHA3s5dwt7w.ttf",
            regular:
              "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHvxk6XweuBCY.ttf",
            italic:
              "https://fonts.gstatic.com/s/lato/v25/S6u8w4BMUTPHjxswWyWrFCbw7A.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/lato/v25/S6u_w4BMUTPHjxsI5wqPHA3s5dwt7w.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/lato/v25/S6u_w4BMUTPHjxsI3wiPHA3s5dwt7w.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/lato/v25/S6uyw4BMUTPHjxgwWw.ttf",
        }),
      ],
      [
        "Merriweather",
        JSON.stringify({
          family: "Merriweather",
          variants: [
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: [
            "cyrillic",
            "cyrillic-ext",
            "latin",
            "latin-ext",
            "vietnamese",
          ],
          version: "v33",
          lastModified: "2025-09-02",
          files: {
            "300":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrgCcqE1f0KvXKYQ.ttf",
            "500":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDr7CcqE1f0KvXKYQ.ttf",
            "600":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrACAqE1f0KvXKYQ.ttf",
            "700":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrOSAqE1f0KvXKYQ.ttf",
            "800":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrXiAqE1f0KvXKYQ.ttf",
            "900":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDrdyAqE1f0KvXKYQ.ttf",
            regular:
              "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDr3icqE1f0KvXKYQ.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmScUF3wCPDaYa_F.ttf",
            italic:
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmTCUF3wCPDaYa_F.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmTwUF3wCPDaYa_F.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmQcV13wCPDaYa_F.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmQlV13wCPDaYa_F.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmRCV13wCPDaYa_F.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/merriweather/v33/u-4B0qyriQwlOrhSvowK_l5-eTxCVx0ZbwLvKH2Gk9hLmp0v5yA-xXPqCzLvPee1XYk_XSf-FmRrV13wCPDaYa_F.ttf",
          },
          category: "serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/merriweather/v33/u-4D0qyriQwlOrhSvowK_l5UcA6zuSYEqOzpPe3HOZJ5eX1WtLaQwmYiScCmDxhtNOKl8yDr3icaEl3w.ttf",
        }),
      ],
      [
        "Montserrat",
        JSON.stringify({
          family: "Montserrat",
          variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: [
            "cyrillic",
            "cyrillic-ext",
            "latin",
            "latin-ext",
            "vietnamese",
          ],
          version: "v31",
          lastModified: "2025-09-05",
          files: {
            "100":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Uw-Y3tcoqK5.ttf",
            "200":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr6Ew-Y3tcoqK5.ttf",
            "300":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCs16Ew-Y3tcoqK5.ttf",
            "500":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtZ6Ew-Y3tcoqK5.ttf",
            "600":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCu170w-Y3tcoqK5.ttf",
            "700":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCuM70w-Y3tcoqK5.ttf",
            "800":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvr70w-Y3tcoqK5.ttf",
            "900":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCvC70w-Y3tcoqK5.ttf",
            regular:
              "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Ew-Y3tcoqK5.ttf",
            "100italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R8aX9-p7K5ILg.ttf",
            "200italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR9aX9-p7K5ILg.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq_p9aX9-p7K5ILg.ttf",
            italic:
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq6R9aX9-p7K5ILg.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq5Z9aX9-p7K5ILg.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq3p6aX9-p7K5ILg.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jq0N6aX9-p7K5ILg.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqyR6aX9-p7K5ILg.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/montserrat/v31/JTUFjIg1_i6t8kCHKm459Wx7xQYXK0vOoz6jqw16aX9-p7K5ILg.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/montserrat/v31/JTUHjIg1_i6t8kCHKm4532VJOt5-QNFgpCtr6Hw_aX8.ttf",
        }),
      ],
      [
        "Source Sans 3",
        JSON.stringify({
          family: "Source Sans 3",
          variants: [
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: [
            "cyrillic",
            "cyrillic-ext",
            "greek",
            "greek-ext",
            "latin",
            "latin-ext",
            "vietnamese",
          ],
          version: "v19",
          lastModified: "2025-09-05",
          files: {
            "200":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw461EN_io6npfB.ttf",
            "300":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kzm61EN_io6npfB.ttf",
            "500":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KyK61EN_io6npfB.ttf",
            "600":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxm7FEN_io6npfB.ttf",
            "700":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kxf7FEN_io6npfB.ttf",
            "800":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Kw47FEN_io6npfB.ttf",
            "900":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8KwR7FEN_io6npfB.ttf",
            regular:
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky461EN_io6npfB.ttf",
            "200italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlO9C4Ym4fB3Ts.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqOdO9C4Ym4fB3Ts.ttf",
            italic:
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqLlO9C4Ym4fB3Ts.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqItO9C4Ym4fB3Ts.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqGdJ9C4Ym4fB3Ts.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqF5J9C4Ym4fB3Ts.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqDlJ9C4Ym4fB3Ts.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/sourcesans3/v19/nwpDtKy2OAdR1K-IwhWudF-R3woAa8opPOrG97lwqBBJ9C4Ym4fB3Ts.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/sourcesans3/v19/nwpBtKy2OAdR1K-IwhWudF-R9QMylBJAV3Bo8Ky462EM9C4.ttf",
        }),
      ],
      [
        "DM Sans",
        JSON.stringify({
          family: "DM Sans",
          variants: [
            "100",
            "200",
            "300",
            "regular",
            "500",
            "600",
            "700",
            "800",
            "900",
            "100italic",
            "200italic",
            "300italic",
            "italic",
            "500italic",
            "600italic",
            "700italic",
            "800italic",
            "900italic",
          ],
          subsets: ["latin", "latin-ext"],
          version: "v17",
          lastModified: "2025-09-11",
          files: {
            "100":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAop1hTmf3ZGMZpg.ttf",
            "200":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpxhTmf3ZGMZpg.ttf",
            "300":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwA_JxhTmf3ZGMZpg.ttf",
            "500":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTmf3ZGMZpg.ttf",
            "600":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAfJthTmf3ZGMZpg.ttf",
            "700":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwARZthTmf3ZGMZpg.ttf",
            "800":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAIpthTmf3ZGMZpg.ttf",
            "900":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAC5thTmf3ZGMZpg.ttf",
            regular:
              "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTmf3ZGMZpg.ttf",
            "100italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDG3zRmYJpso5.ttf",
            "200italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JDW3zRmYJpso5.ttf",
            "300italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat_XDW3zRmYJpso5.ttf",
            italic:
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-JDW3zRmYJpso5.ttf",
            "500italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat-7DW3zRmYJpso5.ttf",
            "600italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9XCm3zRmYJpso5.ttf",
            "700italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat9uCm3zRmYJpso5.ttf",
            "800italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8JCm3zRmYJpso5.ttf",
            "900italic":
              "https://fonts.gstatic.com/s/dmsans/v17/rP2rp2ywxg089UriCZaSExd86J3t9jz86Mvy4qCRAL19DksVat8gCm3zRmYJpso5.ttf",
          },
          category: "sans-serif",
          kind: "webfonts#webfont",
          menu: "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxRT23z.ttf",
        }),
      ],
    ]);
  }

  const {
    name,
    tagline,
    description,
    phone,
    email,
    business_address,
    theme,
    admin,
  } = exmampleAnswers;
  const {
    street_number,
    street_name,
    city,
    state,
    state_code,
    zip_code,
    country,
    formatted_address,
  } = business_address[0];
  const { primary_brand_color, secondary_brand_color } = theme;
  const { first_name, last_name } = admin;

  const businessIdentityAnswers = await prompt([
    {
      type: "input",
      name: "name",
      message: "Business name?",
      initial: name,
    },
    {
      type: "input",
      name: "tagline",
      message: "Short tagline?",
      initial: tagline,
    },
    {
      type: "input",
      name: "description",
      message: "Description?",
      initial: description,
    },
    {
      type: "number",
      name: "phone",
      message: "Business phone?",
      initial: phone,
      // TODO: Fix the validation.
      // validate: (value) =>
      //   parseInt(value) >= 10000000000 &&
      //   parseInt(value) >= 19999999999 &&
      //   Number.isInteger(parseInt(value))
      //     ? true
      //     : "Must be a valid phone number",
    },
    {
      type: "input",
      name: "email",
      message: "Business email?",
      initial: email,
    },
    {
      type: "select",
      name: "category",
      message: "Business category?",
      choices: ["Restaurant", "Cafe", "Bar", "Bakery", "Food truck", "Other"],
    },
    {
      type: "select",
      name: "location_type",
      message: "Location type?",
      choices: ["brick-and-mortar", "mobile", "hybrid", "multi-unit"],
    },
  ]);

  const businessAddressAnswers = (await prompt([
    {
      type: "input",
      name: "street_number",
      message: "Business address street number?",
      initial: street_number,
    },
    {
      type: "input",
      name: "street_name",
      message: "Business address street name?",
      initial: street_name,
    },
    {
      type: "input",
      name: "city",
      message: "Business address city?",
      initial: city,
    },
    {
      type: "select",
      name: "state",
      message: "Business address state?",
      choices: [
        "Illinois",
        // "Indiana",
      ],
    },
    {
      type: "input",
      name: "zip_code",
      message: "Business address zip code?",
      initial: zip_code,
    },
    {
      type: "input",
      name: "country",
      message: "Business address country?",
      initial: country,
    },
  ])) as {
    street_number: string;
    street_name: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
  };

  const { is_billing_same_as_business } = (await prompt([
    {
      type: "select",
      name: "is_billing_same_as_business",
      message: "Is the billing address the same as the business address?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    },
  ])) as { is_billing_same_as_business: boolean };

  const billingAddressAnswers = is_billing_same_as_business
    ? {
        street_number: businessAddressAnswers.street_number,
        street_name: businessAddressAnswers.street_name,
        city: businessAddressAnswers.city,
        state: businessAddressAnswers.state,
        zip_code: businessAddressAnswers.zip_code,
        country: businessAddressAnswers.country,
      }
    : ((await prompt([
        {
          type: "input",
          name: "street_number",
          message: "Billing address street number?",
        },
        {
          type: "input",
          name: "street_name",
          message: "Billing address street name?",
        },
        {
          type: "input",
          name: "city",
          message: "Billing address city?",
        },
        {
          type: "select",
          name: "state",
          message: "Billing address state?",
          choices: [
            "Illinois",
            // "Indiana",
          ],
        },
        {
          type: "input",
          name: "zip_code",
          message: "Billing address zip code?",
        },
        {
          type: "input",
          name: "country",
          message: "Billing address country?",
        },
      ])) as {
        street_number: string;
        street_name: string;
        city: string;
        state: string;
        zip_code: string;
        country: string;
      });

  type ThemeAnswers = {
    platform_theme: typeof theme.platform_theme;
    primary_brand_color: typeof theme.primary_brand_color;
    secondary_brand_color: typeof theme.secondary_brand_color;
    primary_font: string;
    secondary_font: string;
    radius: typeof theme.radius;
    is_dark_mode_enabled: typeof theme.is_dark_mode_enabled;
  };

  const themeAnswers = await prompt<ThemeAnswers>([
    {
      type: "select",
      name: "platform_theme",
      message: "Platform theme?",
      choices: [
        "basic",
        // "minimalist",
        // "immersive",
        // "haute",
        // "modern",
        // "chain",
        // "moody",
        // "friendly",
        // "neighborhood",
        // "retro",
      ],
    },
    {
      type: "input",
      name: "primary_brand_color",
      message: "Primary brand color (hex)?",
      initial: primary_brand_color,
    },
    {
      type: "input",
      name: "secondary_brand_color",
      message: "Secondary brand color (hex)?",
      initial: secondary_brand_color,
    },
    {
      type: "autocomplete",
      name: "primary_font",
      message: "Primary brand font?",
      choices: [...fontMap.keys()],
      maxChoices: 10,
    },
    {
      type: "autocomplete",
      name: "secondary_font",
      message: "Secondary brand font?",
      choices: [...fontMap.keys()],
      maxChoices: 10,
    },
    {
      type: "select",
      name: "radius",
      message: "Radius size?",
      choices: ["Default", "None", "Small", "Medium", "Large"],
    },
    {
      type: "confirm",
      name: "is_dark_mode_enabled",
      message: "Enable dark mode?",
      initial: true,
    },
  ]);

  const formattedTheme: Theme = {
    platform_theme: themeAnswers.platform_theme,
    primary_logo_url: null,
    secondary_logo_url: null,
    primary_brand_color: themeAnswers.primary_brand_color,
    secondary_brand_color: themeAnswers.secondary_brand_color,
    primary_font: JSON.parse(
      fontMap.get(themeAnswers.primary_font) ?? JSON.stringify(InterFont),
    ),
    secondary_font: JSON.parse(
      fontMap.get(themeAnswers.secondary_font) ?? JSON.stringify(InterFont),
    ),
    letter_spacing: 0,
    padding: 0.25,
    radius: themeAnswers.radius,
    is_dark_mode_enabled: themeAnswers.is_dark_mode_enabled,
  };

  const formattedBusinessAddress: Address[] = [
    {
      street_number: businessAddressAnswers.street_number,
      street_name: businessAddressAnswers.street_name,
      city: businessAddressAnswers.city,
      state: businessAddressAnswers.state,
      state_code: states.get(businessAddressAnswers.state) ?? "N/A",
      zip_code: businessAddressAnswers.zip_code,
      country: "United States",
      formatted_address: `${businessAddressAnswers.street_number} ${businessAddressAnswers.street_name}, ${businessAddressAnswers.city}, ${states.get(businessAddressAnswers.state) ?? "N/A"}, USA`,
    },
  ];
  const formattedBillingAddress: Address = {
    street_number: billingAddressAnswers.street_number,
    street_name: billingAddressAnswers.street_name,
    city: billingAddressAnswers.city,
    state: billingAddressAnswers.state,
    state_code: states.get(billingAddressAnswers.state) ?? "N/A",
    zip_code: billingAddressAnswers.zip_code,
    country: "United States",
    formatted_address: `${billingAddressAnswers.street_number} ${billingAddressAnswers.street_name}, ${billingAddressAnswers.city}, ${states.get(billingAddressAnswers.state) ?? "N/A"}, USA`,
  };

  const adminAnswers = await prompt([
    {
      type: "input",
      name: "first_name",
      message: "Admin first name?",
      initial: first_name,
    },
    {
      type: "input",
      name: "last_name",
      message: "Admin last name?",
      initial: last_name,
    },
    {
      type: "number",
      name: "phone",
      message: "Admin phone?",
      initial: admin.phone,
      // TODO: Fix the validation.
      // validate: (value) =>
      //   parseInt(value) >= 10000000000 &&
      //   parseInt(value) >= 19999999999 &&
      //   Number.isInteger(parseInt(value))
      //     ? true
      //     : "Must be a valid phone number",
    },
    {
      type: "input",
      name: "email",
      message: "Admin email?",
      initial: admin.email,
    },
  ]);

  const settingsAnswers = await prompt<{ settings: string[] }>([
    {
      type: "multiselect",
      name: "settings",
      message:
        "Select the features you'd like to enable for your platform.\n  Tip: Use arrow keys to scroll and the Space bar to toggle options.\n",
      choices: [
        {
          name: "is_menu_page_enabled",
          message: "Menu page",
          hint: "Showcase your menu to customers.",
        },
        {
          name: "is_shop_page_enabled",
          message: "Shop page",
          hint: "Showcase your catalog to customers.",
        },
        {
          name: "is_catering_enabled",
          message: "Catering page",
          hint: "Expand the reach of your business with catering.",
        },
        {
          name: "is_customer_accounts_enabled",
          message: "Customers accounts",
          hint: "Allow customers to create accounts.",
        },
        {
          name: "is_rewards_enabled",
          message: "Rewards",
          hint: "Allow customers to earn rewards for their purchases. (Customers accounts required)",
        },
        {
          name: "is_online_ordering_enabled",
          message: "Online ordering",
          hint: "Allow customers to order ahead of time. (Menu page required)",
        },
        {
          name: "is_scheduled_ordering_enabled",
          message: "Scheduled ordering",
          hint: "Allow customers to order ahead of time. (Online ordering required)",
        },
        {
          name: "is_group_ordering_enabled",
          message: "Group ordering",
          hint: "Allow customers to order in groups. (Online ordering required)",
        },
        {
          name: "is_pos_enabled",
          message: "POS integration",
          hint: "Integrate your website with your preferred POS system.",
          disabled: true,
        },
        {
          name: "is_reservations_enabled",
          message: "Reservations",
          hint: "Allow customers to reserve a table ahead of time.",
        },
        {
          name: "is_bill_splitting_enabled",
          message: "Bill splitting",
          hint: "Allow customers in the same group or party to split their bill. (Reservations required)",
        },
      ],
    },
  ]);

  const selectedSettings = settingsAnswers.settings;
  const settings: Settings = {
    is_menu_page_enabled: selectedSettings.includes("is_menu_page_enabled"),
    is_online_ordering_enabled: selectedSettings.includes(
      "is_online_ordering_enabled",
    ),
    is_scheduled_ordering_enabled: selectedSettings.includes(
      "is_scheduled_ordering_enabled",
    ),
    is_group_ordering_enabled: selectedSettings.includes(
      "is_group_ordering_enabled",
    ),
    is_pos_enabled: selectedSettings.includes("is_pos_enabled"),
    is_reservations_enabled: selectedSettings.includes(
      "is_reservations_enabled",
    ),
    is_bill_splitting_enabled: selectedSettings.includes(
      "is_bill_splitting_enabled",
    ),
    is_customer_accounts_enabled: selectedSettings.includes(
      "is_customer_accounts_enabled",
    ),
    is_rewards_enabled: selectedSettings.includes("is_rewards_enabled"),
    is_shop_page_enabled: selectedSettings.includes("is_shop_page_enabled"),
    is_catering_enabled: selectedSettings.includes("is_catering_enabled"),
  };

  const answers = AnswersSchema.parse({
    ...businessIdentityAnswers,
    business_address: formattedBusinessAddress,
    billing_address: formattedBillingAddress,
    theme: formattedTheme,
    admin: { ...adminAnswers },
    settings,
  });

  return { answers, fontMap };
}
