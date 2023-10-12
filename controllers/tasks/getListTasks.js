const { Task } = require("../../models/task");

const getListTasks = async (req, res) => {
    const { _id: owner } = req.user;

    const dateSearch = new Date(req.query.date);
    const date = new Date(req.query.date);
    const searchYear = date.getFullYear();
    let searchMonth = date.getMonth() + 1;
    const { period } = req.query;

    if (searchMonth < 10) {
        searchMonth = `0${searchMonth}`;
    }

    if (period === "day") {
        const listTasks = await Task.find({
            owner,
            date: { $eq: dateSearch },
        });
        console.log("tasks for this day");
        res.status(200).json(listTasks);
    } else {
        console.log(`${searchYear}-${searchMonth}-01T00:00:00.000+00:00`);
        const startDate = new Date(
            `${searchYear}-${searchMonth}-01T00:00:00.000+00:00`
        );
        let endDateString = "";

        if (Number(searchMonth) > 11) {
            endDateString = `${searchYear + 1}-01`;
        } else {
            endDateString = `${searchYear}-`;
            if (searchMonth < 9) {
                endDateString += "0";
            }
            endDateString += `${Number(searchMonth) + 1}`;
        }

        endDateString += "-01T00:00:00.000+00:00";
        const endDate = new Date(endDateString);
        const listTasks = await Task.find({
            owner,
            date: {
                $gte: startDate,
                $lt: endDate,
            },
        });
        console.log("tasks for this month");
        res.status(200).json(listTasks);
    }
};

module.exports = getListTasks;
