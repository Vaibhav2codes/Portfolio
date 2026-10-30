import { FaFileArrowDown, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";
import { SiCodechef, SiCodeforces, SiLeetcode } from "react-icons/si";
import type { IconType } from "react-icons";
import type { socialLinks } from "@/data/portfolio";

export const socialIcons: Record<(typeof socialLinks)[number]["icon"], IconType> = {
  github: FaGithub,
  linkedin: FaLinkedin,
  leetcode: SiLeetcode,
  codeforces: SiCodeforces,
  codechef: SiCodechef,
  instagram: FaInstagram,
  resume: FaFileArrowDown
};
