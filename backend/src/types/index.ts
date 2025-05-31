import { prisma } from "@/database/prisma";
import express from "express";

export type PrismaInstance = typeof prisma;

export type RequestType = express.Request & {
  headers: any;
  context?: any;
};
