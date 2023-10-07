const { Task } = require("../../models/task");

const getListTasks = async (req, res) => {
    // const { year, month, day } = req.query;
    // const today = new Date().toISOString().slice(0, 10);

    // console.log(req);
    const date = new Date(req.query.date);
    console.log("date", date);
    const searchYear = date.getFullYear();
    console.log("year", searchYear);
    const searchMonth = date.getMonth() + 1;
    console.log("month", searchMonth);
    const searchDate = date.getDate();
    console.log("nunmber", searchDate);
    const { period } = req.query;
    // console.log("period", period);
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

    const { _id: owner } = req.user;
    // console.log("owner", owner);

    const startDate = new Date(
        `${searchYear}-${searchMonth}-${period === "day" ? searchDate : 1}`
    );
    const endDate = new Date(
        `${
            searchMonth > 11 && period !== "day" ? searchYear + 1 : searchYear
        }-${
            period === "day"
                ? searchMonth
                : searchMonth > 11
                ? 1
                : searchMonth + 1
        }-${period === "day" ? searchDate : 1}`
    );
    const listTasks = await Task.find({
        owner,
        date: {
            $gte: startDate,
            // new Date(
            // `${searchYear}-${searchMonth}-${
            //     period === "day" ? searchDate : 1
            //     }`),
            $lte: endDate,
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

    res.status(200).json(listTasks);
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
