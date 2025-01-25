

class BaseRepository {
    constructor(model) {
        this.setModel(model);
    } 

    getModel() {

        return this.model;
    }

    setModel(model) {
        this.model = model;
    }

    store(data) {
        return this.getModel().create({
            ...data,
            createBy: null,
        });
    }
    
    findById(userId) {
        return this.getModel().findById(userId);
    }

    findOne(conditions) {
        return this.getModel().findOne(conditions);
    }

    findByIdAndUpdate(userId, data, authUser) {
        data = {
            ...data,
            updateBy: authUser._id,
        }
        
        return this.getModel().findByIdAndUpdate(userId, data, {new: true});
    }

    findByIdAndDelete(userId) {
        return this.getModel().findByIdAndDelete(userId);
    }

    index(conditions, pagination) {
        return this.getModel().find(conditions).skip( (pagination.page -1) * pagination.limit ).limit(pagination.limit)
    }
}


export default BaseRepository;