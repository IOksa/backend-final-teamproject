const { Task } = require("../../models/task");

const getListTasks = async (req, res) => {
    const { _id: owner } = req.user;

    // const { year, month, day } = req.query;
    // const today = new Date().toISOString().slice(0, 10);

    // console.log(req);
    // const dateSearch = new Date(req.query.date);
    const date = new Date(req.query.date);
    console.log("date", date);

    const searchYear = date.getFullYear();
    console.log("year", searchYear);

    let searchMonth = date.getMonth() + 1;
    if (searchMonth < 10) {
        searchMonth = `0${searchMonth}`;
    }
    console.log("month", searchMonth);

    const searchDate = date.getDate();
    console.log("nunmber", searchDate);

    const { period } = req.query;
    console.log("period", period);
    // const dateList = new Date(req.params);
    // const monthFind = 11;
    //     Task.aggregate([
    //     {
    //         $project: {
    //             year: { $year: "$date" },
    //             month: { $month: "$date" },
    //             // day: { $dayOfMonth: "$date" },
    //             // hour: { $hour: "$date" },
    //             // minutes: { $minute: "$date" },
    //             // seconds: { $second: "$date" },
    //             // milliseconds: { $millisecond: "$date" },
    //             // dayOfYear: { $dayOfYear: "$date" },
    //             // dayOfWeek: { $dayOfWeek: "$date" },
    //             // week: { $week: "$date" },
    //         },
    //     },
    // ]);
    // console.log(monthFind);
    // searchMonth > 12 ? 1 : searchMonth + 1;ґ

    // console.log("owner", owner);

    // const startDate = new Date(
    //     `${searchYear}-${searchMonth}-${period === "day" ? searchDate : 1}`
    // );
    // console.log("startDate", startDate);

    // const endDate = new Date(
    //     `${
    //         searchMonth > 11 && period !== "day" ? searchYear + 1 : searchYear
    //     }-${
    //         period === "day"
    //             ? searchMonth
    //             : searchMonth > 11
    //             ? 1
    //             : searchMonth + 1
    //     }-${period === "day" ? searchDate : 1}`
    // );
    // console.log("endtDate", endDate);

    // const tasksThisDay = await Task.find(owner, date: { $gte: dateSearch });
    // console.log("tasksThisDay", tasksThisDay);

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
        console.log("startDate", startDate);

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
        console.log("endDateString", endDateString);
        const endDate = new Date(endDateString);
        console.log("endtDate", endDate);

        const listTasks = await Task.find({
            owner,
            date: {
                $gte: startDate,
                // new Date(
                // `${searchYear}-${searchMonth}-${
                //     period === "day" ? searchDate : 1
                //     }`),
                $lt: endDate,
                //     new Date(
                //     `${
                //         searchMonth > 11 && period !== "day"
                //             ? searchYear + 1
                //             : searchYear
                //     }-${
                //         period === "day"
                //             ? searchMonth
                //             : searchMonth > 11
                //             ? 1
                //             : searchMonth + 1
                //     }-${period === "day" ? searchDate + 1 : 1}` ),
            },
        });
        console.log("tasks for this month");
        res.status(200).json(listTasks);
    }
};

module.exports = getListTasks;

// const listTaks = await Task.aggregate(
//     [
//         {
//             $project: {
//                 year: { $year: "$date" },
//                 month: { $month: "$date" },
//                 // day: { $dayOfMonth: "$date" },
//                 // hour: { $hour: "$date" },
//                 // minutes: { $minute: "$date" },
//                 // seconds: { $second: "$date" },
//                 // milliseconds: { $millisecond: "$date" },
//                 // dayOfYear: { $dayOfYear: "$date" },
//                 // dayOfWeek: { $dayOfWeek: "$date" },
//                 // week: { $week: "$date" },
//             },
//         },
//     ]
//     // [
//     // {
//     //     $project: {
//     //         date: {
//     //             year: {
//     //                 $year: new Date("Fri, 01 Sep 2023 00:00:00 GMT"),
//     //             },
//     //         },
//     //     },
//     // },
//     // ]
// );
// res.json(listTaks);
