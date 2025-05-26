

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

    findByIdAndUpdate(userId, data, authUserId='') {
        const newData = { ...data, updateBy: authUserId }
                
        return this.getModel().findByIdAndUpdate(userId, { $set: newData }, {new: true});
    }

    findByIdAndDelete(userId) {
        return this.getModel().findByIdAndDelete(userId);
    }

    index(conditions, pagination) {
        return this.getModel().find(conditions).skip( (pagination.page -1) * pagination.limit ).limit(pagination.limit)
    }
}


export default BaseRepository;