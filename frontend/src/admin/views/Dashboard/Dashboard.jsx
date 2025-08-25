import React from "react";
// import { Grid } from "@mui/material";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";
// import StoreIcon from "@mui/icons-material/Store";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import WarningIcon from "@mui/icons-material/Warning";
// import DateRangeIcon from "@mui/icons-material/DateRange";
// import LocalOfferIcon from "@mui/icons-material/LocalOffer";
// import UpdateIcon from "@mui/icons-material/Update";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
// import AccessibilityIcon from "@mui/icons-material/Accessibility";

// react plugin for creating charts
// import ChartistGraph from "react-chartist";

// import {
//   StatsCard,
//   ChartCard,
//   TasksCard,
//   RegularCard,
//   Table,
//   ItemGrid,
// } from "components";

// import {
//   dailySalesChart,
//   emailsSubscriptionChart,
//   completedTasksChart,
// } from "variables/charts";

export default function Dashboard() {
  return (
    <div>
      {/* Stats Cards */}
      <Grid container spacing={2}>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={ContentCopyIcon}
            iconColor="orange"
            title="Used Space"
            description="49/50"
            small="GB"
            statIcon={WarningIcon}
            statIconColor="danger"
            statLink={{ text: "Get More Space...", href: "#pablo" }}
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={StoreIcon}
            iconColor="green"
            title="Revenue"
            description="$34,245"
            statIcon={DateRangeIcon}
            statText="Last 24 Hours"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={InfoOutlinedIcon}
            iconColor="red"
            title="Fixed Issues"
            description="75"
            statIcon={LocalOfferIcon}
            statText="Tracked from Github"
          />
        </ItemGrid>
        <ItemGrid xs={12} sm={6} md={3}>
          <StatsCard
            icon={AccessibilityIcon}
            iconColor="blue"
            title="Followers"
            description="+245"
            statIcon={UpdateIcon}
            statText="Just Updated"
          />
        </ItemGrid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={2}>
        <ItemGrid xs={12} sm={12} md={4}>
          <ChartCard
            chart={
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            }
            chartColor="green"
            title="Daily Sales"
            text={
              <span>
                <span style={{ color: "green", fontWeight: "bold" }}>
                  <ArrowUpwardIcon fontSize="small" /> 55%
                </span>{" "}
                increase in today sales.
              </span>
            }
            statIcon={AccessTimeIcon}
            statText="updated 4 minutes ago"
          />
        </ItemGrid>

        <ItemGrid xs={12} sm={12} md={4}>
          <ChartCard
            chart={
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            }
            chartColor="orange"
            title="Email Subscriptions"
            text="Last Campaign Performance"
            statIcon={AccessTimeIcon}
            statText="campaign sent 2 days ago"
          />
        </ItemGrid>

        <ItemGrid xs={12} sm={12} md={4}>
          <ChartCard
            chart={
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            }
            chartColor="red"
            title="Completed Tasks"
            text="Last Campaign Performance"
            statIcon={AccessTimeIcon}
            statText="campaign sent 2 days ago"
          />
        </ItemGrid>
      </Grid>

      {/* Tasks and Table */}
      <Grid container spacing={2}>
        <ItemGrid xs={12} sm={12} md={6}>
          <TasksCard />
        </ItemGrid>
        <ItemGrid xs={12} sm={12} md={6}>
          <RegularCard
            headerColor="orange"
            cardTitle="Employees Stats"
            cardSubtitle="New employees on 15th September, 2016"
            content={
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"],
                ]}
              />
            }
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}
