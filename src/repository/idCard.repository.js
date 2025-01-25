import BaseRepository from "./base.repository.js";
import { IdCard } from "../models/idCard.model.js";

class IdCardRepository extends BaseRepository {
    constructor() {
        super(IdCard);
    }
}

export default IdCardRepository;
