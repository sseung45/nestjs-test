
import { PartialType } from "@nestjs/mapped-types";
import { CreateCatDto } from "./create-cat.dto";

export class updateCatDto extends PartialType(CreateCatDto) {}