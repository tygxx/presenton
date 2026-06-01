import { TemplateWithData, TemplateGroupSettings, createTemplateEntry, TemplateLayoutsWithSettings } from "./utils";

// 本文件由 scripts/gen-template-index.mjs 自动生成，请勿手改。
// 中文场景内置模板组（13 组）。

import BusinessCnCover, { Schema as BusinessCnCoverSchema, layoutId as BusinessCnCoverId, layoutName as BusinessCnCoverName, layoutDescription as BusinessCnCoverDesc } from "./business-cn/Cover";
import BusinessCnTableOfContents, { Schema as BusinessCnTableOfContentsSchema, layoutId as BusinessCnTableOfContentsId, layoutName as BusinessCnTableOfContentsName, layoutDescription as BusinessCnTableOfContentsDesc } from "./business-cn/TableOfContents";
import BusinessCnSectionDivider, { Schema as BusinessCnSectionDividerSchema, layoutId as BusinessCnSectionDividerId, layoutName as BusinessCnSectionDividerName, layoutDescription as BusinessCnSectionDividerDesc } from "./business-cn/SectionDivider";
import BusinessCnBigStatement, { Schema as BusinessCnBigStatementSchema, layoutId as BusinessCnBigStatementId, layoutName as BusinessCnBigStatementName, layoutDescription as BusinessCnBigStatementDesc } from "./business-cn/BigStatement";
import BusinessCnThreePoints, { Schema as BusinessCnThreePointsSchema, layoutId as BusinessCnThreePointsId, layoutName as BusinessCnThreePointsName, layoutDescription as BusinessCnThreePointsDesc } from "./business-cn/ThreePoints";
import BusinessCnFourFeatures, { Schema as BusinessCnFourFeaturesSchema, layoutId as BusinessCnFourFeaturesId, layoutName as BusinessCnFourFeaturesName, layoutDescription as BusinessCnFourFeaturesDesc } from "./business-cn/FourFeatures";
import BusinessCnIconList, { Schema as BusinessCnIconListSchema, layoutId as BusinessCnIconListId, layoutName as BusinessCnIconListName, layoutDescription as BusinessCnIconListDesc } from "./business-cn/IconList";
import BusinessCnKpiMetrics, { Schema as BusinessCnKpiMetricsSchema, layoutId as BusinessCnKpiMetricsId, layoutName as BusinessCnKpiMetricsName, layoutDescription as BusinessCnKpiMetricsDesc } from "./business-cn/KpiMetrics";
import BusinessCnComparison, { Schema as BusinessCnComparisonSchema, layoutId as BusinessCnComparisonId, layoutName as BusinessCnComparisonName, layoutDescription as BusinessCnComparisonDesc } from "./business-cn/Comparison";
import BusinessCnTimeline, { Schema as BusinessCnTimelineSchema, layoutId as BusinessCnTimelineId, layoutName as BusinessCnTimelineName, layoutDescription as BusinessCnTimelineDesc } from "./business-cn/Timeline";
import BusinessCnProcessSteps, { Schema as BusinessCnProcessStepsSchema, layoutId as BusinessCnProcessStepsId, layoutName as BusinessCnProcessStepsName, layoutDescription as BusinessCnProcessStepsDesc } from "./business-cn/ProcessSteps";
import BusinessCnRoadmap, { Schema as BusinessCnRoadmapSchema, layoutId as BusinessCnRoadmapId, layoutName as BusinessCnRoadmapName, layoutDescription as BusinessCnRoadmapDesc } from "./business-cn/Roadmap";
import BusinessCnBarChart, { Schema as BusinessCnBarChartSchema, layoutId as BusinessCnBarChartId, layoutName as BusinessCnBarChartName, layoutDescription as BusinessCnBarChartDesc } from "./business-cn/BarChart";
import BusinessCnPieDonut, { Schema as BusinessCnPieDonutSchema, layoutId as BusinessCnPieDonutId, layoutName as BusinessCnPieDonutName, layoutDescription as BusinessCnPieDonutDesc } from "./business-cn/PieDonut";
import BusinessCnLineChart, { Schema as BusinessCnLineChartSchema, layoutId as BusinessCnLineChartId, layoutName as BusinessCnLineChartName, layoutDescription as BusinessCnLineChartDesc } from "./business-cn/LineChart";
import BusinessCnDataTable, { Schema as BusinessCnDataTableSchema, layoutId as BusinessCnDataTableId, layoutName as BusinessCnDataTableName, layoutDescription as BusinessCnDataTableDesc } from "./business-cn/DataTable";
import BusinessCnImageLeft, { Schema as BusinessCnImageLeftSchema, layoutId as BusinessCnImageLeftId, layoutName as BusinessCnImageLeftName, layoutDescription as BusinessCnImageLeftDesc } from "./business-cn/ImageLeft";
import BusinessCnImageRight, { Schema as BusinessCnImageRightSchema, layoutId as BusinessCnImageRightId, layoutName as BusinessCnImageRightName, layoutDescription as BusinessCnImageRightDesc } from "./business-cn/ImageRight";
import BusinessCnFullBleedImage, { Schema as BusinessCnFullBleedImageSchema, layoutId as BusinessCnFullBleedImageId, layoutName as BusinessCnFullBleedImageName, layoutDescription as BusinessCnFullBleedImageDesc } from "./business-cn/FullBleedImage";
import BusinessCnQuote, { Schema as BusinessCnQuoteSchema, layoutId as BusinessCnQuoteId, layoutName as BusinessCnQuoteName, layoutDescription as BusinessCnQuoteDesc } from "./business-cn/Quote";
import BusinessCnTeamGrid, { Schema as BusinessCnTeamGridSchema, layoutId as BusinessCnTeamGridId, layoutName as BusinessCnTeamGridName, layoutDescription as BusinessCnTeamGridDesc } from "./business-cn/TeamGrid";
import BusinessCnClosing, { Schema as BusinessCnClosingSchema, layoutId as BusinessCnClosingId, layoutName as BusinessCnClosingName, layoutDescription as BusinessCnClosingDesc } from "./business-cn/Closing";
import TechCnCover, { Schema as TechCnCoverSchema, layoutId as TechCnCoverId, layoutName as TechCnCoverName, layoutDescription as TechCnCoverDesc } from "./tech-cn/Cover";
import TechCnTableOfContents, { Schema as TechCnTableOfContentsSchema, layoutId as TechCnTableOfContentsId, layoutName as TechCnTableOfContentsName, layoutDescription as TechCnTableOfContentsDesc } from "./tech-cn/TableOfContents";
import TechCnSectionDivider, { Schema as TechCnSectionDividerSchema, layoutId as TechCnSectionDividerId, layoutName as TechCnSectionDividerName, layoutDescription as TechCnSectionDividerDesc } from "./tech-cn/SectionDivider";
import TechCnBigStatement, { Schema as TechCnBigStatementSchema, layoutId as TechCnBigStatementId, layoutName as TechCnBigStatementName, layoutDescription as TechCnBigStatementDesc } from "./tech-cn/BigStatement";
import TechCnThreePoints, { Schema as TechCnThreePointsSchema, layoutId as TechCnThreePointsId, layoutName as TechCnThreePointsName, layoutDescription as TechCnThreePointsDesc } from "./tech-cn/ThreePoints";
import TechCnFourFeatures, { Schema as TechCnFourFeaturesSchema, layoutId as TechCnFourFeaturesId, layoutName as TechCnFourFeaturesName, layoutDescription as TechCnFourFeaturesDesc } from "./tech-cn/FourFeatures";
import TechCnIconList, { Schema as TechCnIconListSchema, layoutId as TechCnIconListId, layoutName as TechCnIconListName, layoutDescription as TechCnIconListDesc } from "./tech-cn/IconList";
import TechCnKpiMetrics, { Schema as TechCnKpiMetricsSchema, layoutId as TechCnKpiMetricsId, layoutName as TechCnKpiMetricsName, layoutDescription as TechCnKpiMetricsDesc } from "./tech-cn/KpiMetrics";
import TechCnComparison, { Schema as TechCnComparisonSchema, layoutId as TechCnComparisonId, layoutName as TechCnComparisonName, layoutDescription as TechCnComparisonDesc } from "./tech-cn/Comparison";
import TechCnTimeline, { Schema as TechCnTimelineSchema, layoutId as TechCnTimelineId, layoutName as TechCnTimelineName, layoutDescription as TechCnTimelineDesc } from "./tech-cn/Timeline";
import TechCnProcessSteps, { Schema as TechCnProcessStepsSchema, layoutId as TechCnProcessStepsId, layoutName as TechCnProcessStepsName, layoutDescription as TechCnProcessStepsDesc } from "./tech-cn/ProcessSteps";
import TechCnRoadmap, { Schema as TechCnRoadmapSchema, layoutId as TechCnRoadmapId, layoutName as TechCnRoadmapName, layoutDescription as TechCnRoadmapDesc } from "./tech-cn/Roadmap";
import TechCnBarChart, { Schema as TechCnBarChartSchema, layoutId as TechCnBarChartId, layoutName as TechCnBarChartName, layoutDescription as TechCnBarChartDesc } from "./tech-cn/BarChart";
import TechCnPieDonut, { Schema as TechCnPieDonutSchema, layoutId as TechCnPieDonutId, layoutName as TechCnPieDonutName, layoutDescription as TechCnPieDonutDesc } from "./tech-cn/PieDonut";
import TechCnLineChart, { Schema as TechCnLineChartSchema, layoutId as TechCnLineChartId, layoutName as TechCnLineChartName, layoutDescription as TechCnLineChartDesc } from "./tech-cn/LineChart";
import TechCnDataTable, { Schema as TechCnDataTableSchema, layoutId as TechCnDataTableId, layoutName as TechCnDataTableName, layoutDescription as TechCnDataTableDesc } from "./tech-cn/DataTable";
import TechCnImageLeft, { Schema as TechCnImageLeftSchema, layoutId as TechCnImageLeftId, layoutName as TechCnImageLeftName, layoutDescription as TechCnImageLeftDesc } from "./tech-cn/ImageLeft";
import TechCnImageRight, { Schema as TechCnImageRightSchema, layoutId as TechCnImageRightId, layoutName as TechCnImageRightName, layoutDescription as TechCnImageRightDesc } from "./tech-cn/ImageRight";
import TechCnFullBleedImage, { Schema as TechCnFullBleedImageSchema, layoutId as TechCnFullBleedImageId, layoutName as TechCnFullBleedImageName, layoutDescription as TechCnFullBleedImageDesc } from "./tech-cn/FullBleedImage";
import TechCnQuote, { Schema as TechCnQuoteSchema, layoutId as TechCnQuoteId, layoutName as TechCnQuoteName, layoutDescription as TechCnQuoteDesc } from "./tech-cn/Quote";
import TechCnTeamGrid, { Schema as TechCnTeamGridSchema, layoutId as TechCnTeamGridId, layoutName as TechCnTeamGridName, layoutDescription as TechCnTeamGridDesc } from "./tech-cn/TeamGrid";
import TechCnClosing, { Schema as TechCnClosingSchema, layoutId as TechCnClosingId, layoutName as TechCnClosingName, layoutDescription as TechCnClosingDesc } from "./tech-cn/Closing";
import MedicalCnCover, { Schema as MedicalCnCoverSchema, layoutId as MedicalCnCoverId, layoutName as MedicalCnCoverName, layoutDescription as MedicalCnCoverDesc } from "./medical-cn/Cover";
import MedicalCnTableOfContents, { Schema as MedicalCnTableOfContentsSchema, layoutId as MedicalCnTableOfContentsId, layoutName as MedicalCnTableOfContentsName, layoutDescription as MedicalCnTableOfContentsDesc } from "./medical-cn/TableOfContents";
import MedicalCnSectionDivider, { Schema as MedicalCnSectionDividerSchema, layoutId as MedicalCnSectionDividerId, layoutName as MedicalCnSectionDividerName, layoutDescription as MedicalCnSectionDividerDesc } from "./medical-cn/SectionDivider";
import MedicalCnBigStatement, { Schema as MedicalCnBigStatementSchema, layoutId as MedicalCnBigStatementId, layoutName as MedicalCnBigStatementName, layoutDescription as MedicalCnBigStatementDesc } from "./medical-cn/BigStatement";
import MedicalCnThreePoints, { Schema as MedicalCnThreePointsSchema, layoutId as MedicalCnThreePointsId, layoutName as MedicalCnThreePointsName, layoutDescription as MedicalCnThreePointsDesc } from "./medical-cn/ThreePoints";
import MedicalCnFourFeatures, { Schema as MedicalCnFourFeaturesSchema, layoutId as MedicalCnFourFeaturesId, layoutName as MedicalCnFourFeaturesName, layoutDescription as MedicalCnFourFeaturesDesc } from "./medical-cn/FourFeatures";
import MedicalCnIconList, { Schema as MedicalCnIconListSchema, layoutId as MedicalCnIconListId, layoutName as MedicalCnIconListName, layoutDescription as MedicalCnIconListDesc } from "./medical-cn/IconList";
import MedicalCnKpiMetrics, { Schema as MedicalCnKpiMetricsSchema, layoutId as MedicalCnKpiMetricsId, layoutName as MedicalCnKpiMetricsName, layoutDescription as MedicalCnKpiMetricsDesc } from "./medical-cn/KpiMetrics";
import MedicalCnComparison, { Schema as MedicalCnComparisonSchema, layoutId as MedicalCnComparisonId, layoutName as MedicalCnComparisonName, layoutDescription as MedicalCnComparisonDesc } from "./medical-cn/Comparison";
import MedicalCnTimeline, { Schema as MedicalCnTimelineSchema, layoutId as MedicalCnTimelineId, layoutName as MedicalCnTimelineName, layoutDescription as MedicalCnTimelineDesc } from "./medical-cn/Timeline";
import MedicalCnProcessSteps, { Schema as MedicalCnProcessStepsSchema, layoutId as MedicalCnProcessStepsId, layoutName as MedicalCnProcessStepsName, layoutDescription as MedicalCnProcessStepsDesc } from "./medical-cn/ProcessSteps";
import MedicalCnRoadmap, { Schema as MedicalCnRoadmapSchema, layoutId as MedicalCnRoadmapId, layoutName as MedicalCnRoadmapName, layoutDescription as MedicalCnRoadmapDesc } from "./medical-cn/Roadmap";
import MedicalCnBarChart, { Schema as MedicalCnBarChartSchema, layoutId as MedicalCnBarChartId, layoutName as MedicalCnBarChartName, layoutDescription as MedicalCnBarChartDesc } from "./medical-cn/BarChart";
import MedicalCnPieDonut, { Schema as MedicalCnPieDonutSchema, layoutId as MedicalCnPieDonutId, layoutName as MedicalCnPieDonutName, layoutDescription as MedicalCnPieDonutDesc } from "./medical-cn/PieDonut";
import MedicalCnLineChart, { Schema as MedicalCnLineChartSchema, layoutId as MedicalCnLineChartId, layoutName as MedicalCnLineChartName, layoutDescription as MedicalCnLineChartDesc } from "./medical-cn/LineChart";
import MedicalCnDataTable, { Schema as MedicalCnDataTableSchema, layoutId as MedicalCnDataTableId, layoutName as MedicalCnDataTableName, layoutDescription as MedicalCnDataTableDesc } from "./medical-cn/DataTable";
import MedicalCnImageLeft, { Schema as MedicalCnImageLeftSchema, layoutId as MedicalCnImageLeftId, layoutName as MedicalCnImageLeftName, layoutDescription as MedicalCnImageLeftDesc } from "./medical-cn/ImageLeft";
import MedicalCnImageRight, { Schema as MedicalCnImageRightSchema, layoutId as MedicalCnImageRightId, layoutName as MedicalCnImageRightName, layoutDescription as MedicalCnImageRightDesc } from "./medical-cn/ImageRight";
import MedicalCnFullBleedImage, { Schema as MedicalCnFullBleedImageSchema, layoutId as MedicalCnFullBleedImageId, layoutName as MedicalCnFullBleedImageName, layoutDescription as MedicalCnFullBleedImageDesc } from "./medical-cn/FullBleedImage";
import MedicalCnQuote, { Schema as MedicalCnQuoteSchema, layoutId as MedicalCnQuoteId, layoutName as MedicalCnQuoteName, layoutDescription as MedicalCnQuoteDesc } from "./medical-cn/Quote";
import MedicalCnTeamGrid, { Schema as MedicalCnTeamGridSchema, layoutId as MedicalCnTeamGridId, layoutName as MedicalCnTeamGridName, layoutDescription as MedicalCnTeamGridDesc } from "./medical-cn/TeamGrid";
import MedicalCnClosing, { Schema as MedicalCnClosingSchema, layoutId as MedicalCnClosingId, layoutName as MedicalCnClosingName, layoutDescription as MedicalCnClosingDesc } from "./medical-cn/Closing";
import EducationCnCover, { Schema as EducationCnCoverSchema, layoutId as EducationCnCoverId, layoutName as EducationCnCoverName, layoutDescription as EducationCnCoverDesc } from "./education-cn/Cover";
import EducationCnTableOfContents, { Schema as EducationCnTableOfContentsSchema, layoutId as EducationCnTableOfContentsId, layoutName as EducationCnTableOfContentsName, layoutDescription as EducationCnTableOfContentsDesc } from "./education-cn/TableOfContents";
import EducationCnSectionDivider, { Schema as EducationCnSectionDividerSchema, layoutId as EducationCnSectionDividerId, layoutName as EducationCnSectionDividerName, layoutDescription as EducationCnSectionDividerDesc } from "./education-cn/SectionDivider";
import EducationCnBigStatement, { Schema as EducationCnBigStatementSchema, layoutId as EducationCnBigStatementId, layoutName as EducationCnBigStatementName, layoutDescription as EducationCnBigStatementDesc } from "./education-cn/BigStatement";
import EducationCnThreePoints, { Schema as EducationCnThreePointsSchema, layoutId as EducationCnThreePointsId, layoutName as EducationCnThreePointsName, layoutDescription as EducationCnThreePointsDesc } from "./education-cn/ThreePoints";
import EducationCnFourFeatures, { Schema as EducationCnFourFeaturesSchema, layoutId as EducationCnFourFeaturesId, layoutName as EducationCnFourFeaturesName, layoutDescription as EducationCnFourFeaturesDesc } from "./education-cn/FourFeatures";
import EducationCnIconList, { Schema as EducationCnIconListSchema, layoutId as EducationCnIconListId, layoutName as EducationCnIconListName, layoutDescription as EducationCnIconListDesc } from "./education-cn/IconList";
import EducationCnKpiMetrics, { Schema as EducationCnKpiMetricsSchema, layoutId as EducationCnKpiMetricsId, layoutName as EducationCnKpiMetricsName, layoutDescription as EducationCnKpiMetricsDesc } from "./education-cn/KpiMetrics";
import EducationCnComparison, { Schema as EducationCnComparisonSchema, layoutId as EducationCnComparisonId, layoutName as EducationCnComparisonName, layoutDescription as EducationCnComparisonDesc } from "./education-cn/Comparison";
import EducationCnTimeline, { Schema as EducationCnTimelineSchema, layoutId as EducationCnTimelineId, layoutName as EducationCnTimelineName, layoutDescription as EducationCnTimelineDesc } from "./education-cn/Timeline";
import EducationCnProcessSteps, { Schema as EducationCnProcessStepsSchema, layoutId as EducationCnProcessStepsId, layoutName as EducationCnProcessStepsName, layoutDescription as EducationCnProcessStepsDesc } from "./education-cn/ProcessSteps";
import EducationCnRoadmap, { Schema as EducationCnRoadmapSchema, layoutId as EducationCnRoadmapId, layoutName as EducationCnRoadmapName, layoutDescription as EducationCnRoadmapDesc } from "./education-cn/Roadmap";
import EducationCnBarChart, { Schema as EducationCnBarChartSchema, layoutId as EducationCnBarChartId, layoutName as EducationCnBarChartName, layoutDescription as EducationCnBarChartDesc } from "./education-cn/BarChart";
import EducationCnPieDonut, { Schema as EducationCnPieDonutSchema, layoutId as EducationCnPieDonutId, layoutName as EducationCnPieDonutName, layoutDescription as EducationCnPieDonutDesc } from "./education-cn/PieDonut";
import EducationCnLineChart, { Schema as EducationCnLineChartSchema, layoutId as EducationCnLineChartId, layoutName as EducationCnLineChartName, layoutDescription as EducationCnLineChartDesc } from "./education-cn/LineChart";
import EducationCnDataTable, { Schema as EducationCnDataTableSchema, layoutId as EducationCnDataTableId, layoutName as EducationCnDataTableName, layoutDescription as EducationCnDataTableDesc } from "./education-cn/DataTable";
import EducationCnImageLeft, { Schema as EducationCnImageLeftSchema, layoutId as EducationCnImageLeftId, layoutName as EducationCnImageLeftName, layoutDescription as EducationCnImageLeftDesc } from "./education-cn/ImageLeft";
import EducationCnImageRight, { Schema as EducationCnImageRightSchema, layoutId as EducationCnImageRightId, layoutName as EducationCnImageRightName, layoutDescription as EducationCnImageRightDesc } from "./education-cn/ImageRight";
import EducationCnFullBleedImage, { Schema as EducationCnFullBleedImageSchema, layoutId as EducationCnFullBleedImageId, layoutName as EducationCnFullBleedImageName, layoutDescription as EducationCnFullBleedImageDesc } from "./education-cn/FullBleedImage";
import EducationCnQuote, { Schema as EducationCnQuoteSchema, layoutId as EducationCnQuoteId, layoutName as EducationCnQuoteName, layoutDescription as EducationCnQuoteDesc } from "./education-cn/Quote";
import EducationCnTeamGrid, { Schema as EducationCnTeamGridSchema, layoutId as EducationCnTeamGridId, layoutName as EducationCnTeamGridName, layoutDescription as EducationCnTeamGridDesc } from "./education-cn/TeamGrid";
import EducationCnClosing, { Schema as EducationCnClosingSchema, layoutId as EducationCnClosingId, layoutName as EducationCnClosingName, layoutDescription as EducationCnClosingDesc } from "./education-cn/Closing";
import FoodCnCover, { Schema as FoodCnCoverSchema, layoutId as FoodCnCoverId, layoutName as FoodCnCoverName, layoutDescription as FoodCnCoverDesc } from "./food-cn/Cover";
import FoodCnTableOfContents, { Schema as FoodCnTableOfContentsSchema, layoutId as FoodCnTableOfContentsId, layoutName as FoodCnTableOfContentsName, layoutDescription as FoodCnTableOfContentsDesc } from "./food-cn/TableOfContents";
import FoodCnSectionDivider, { Schema as FoodCnSectionDividerSchema, layoutId as FoodCnSectionDividerId, layoutName as FoodCnSectionDividerName, layoutDescription as FoodCnSectionDividerDesc } from "./food-cn/SectionDivider";
import FoodCnBigStatement, { Schema as FoodCnBigStatementSchema, layoutId as FoodCnBigStatementId, layoutName as FoodCnBigStatementName, layoutDescription as FoodCnBigStatementDesc } from "./food-cn/BigStatement";
import FoodCnThreePoints, { Schema as FoodCnThreePointsSchema, layoutId as FoodCnThreePointsId, layoutName as FoodCnThreePointsName, layoutDescription as FoodCnThreePointsDesc } from "./food-cn/ThreePoints";
import FoodCnFourFeatures, { Schema as FoodCnFourFeaturesSchema, layoutId as FoodCnFourFeaturesId, layoutName as FoodCnFourFeaturesName, layoutDescription as FoodCnFourFeaturesDesc } from "./food-cn/FourFeatures";
import FoodCnIconList, { Schema as FoodCnIconListSchema, layoutId as FoodCnIconListId, layoutName as FoodCnIconListName, layoutDescription as FoodCnIconListDesc } from "./food-cn/IconList";
import FoodCnKpiMetrics, { Schema as FoodCnKpiMetricsSchema, layoutId as FoodCnKpiMetricsId, layoutName as FoodCnKpiMetricsName, layoutDescription as FoodCnKpiMetricsDesc } from "./food-cn/KpiMetrics";
import FoodCnComparison, { Schema as FoodCnComparisonSchema, layoutId as FoodCnComparisonId, layoutName as FoodCnComparisonName, layoutDescription as FoodCnComparisonDesc } from "./food-cn/Comparison";
import FoodCnTimeline, { Schema as FoodCnTimelineSchema, layoutId as FoodCnTimelineId, layoutName as FoodCnTimelineName, layoutDescription as FoodCnTimelineDesc } from "./food-cn/Timeline";
import FoodCnProcessSteps, { Schema as FoodCnProcessStepsSchema, layoutId as FoodCnProcessStepsId, layoutName as FoodCnProcessStepsName, layoutDescription as FoodCnProcessStepsDesc } from "./food-cn/ProcessSteps";
import FoodCnRoadmap, { Schema as FoodCnRoadmapSchema, layoutId as FoodCnRoadmapId, layoutName as FoodCnRoadmapName, layoutDescription as FoodCnRoadmapDesc } from "./food-cn/Roadmap";
import FoodCnBarChart, { Schema as FoodCnBarChartSchema, layoutId as FoodCnBarChartId, layoutName as FoodCnBarChartName, layoutDescription as FoodCnBarChartDesc } from "./food-cn/BarChart";
import FoodCnPieDonut, { Schema as FoodCnPieDonutSchema, layoutId as FoodCnPieDonutId, layoutName as FoodCnPieDonutName, layoutDescription as FoodCnPieDonutDesc } from "./food-cn/PieDonut";
import FoodCnLineChart, { Schema as FoodCnLineChartSchema, layoutId as FoodCnLineChartId, layoutName as FoodCnLineChartName, layoutDescription as FoodCnLineChartDesc } from "./food-cn/LineChart";
import FoodCnDataTable, { Schema as FoodCnDataTableSchema, layoutId as FoodCnDataTableId, layoutName as FoodCnDataTableName, layoutDescription as FoodCnDataTableDesc } from "./food-cn/DataTable";
import FoodCnImageLeft, { Schema as FoodCnImageLeftSchema, layoutId as FoodCnImageLeftId, layoutName as FoodCnImageLeftName, layoutDescription as FoodCnImageLeftDesc } from "./food-cn/ImageLeft";
import FoodCnImageRight, { Schema as FoodCnImageRightSchema, layoutId as FoodCnImageRightId, layoutName as FoodCnImageRightName, layoutDescription as FoodCnImageRightDesc } from "./food-cn/ImageRight";
import FoodCnFullBleedImage, { Schema as FoodCnFullBleedImageSchema, layoutId as FoodCnFullBleedImageId, layoutName as FoodCnFullBleedImageName, layoutDescription as FoodCnFullBleedImageDesc } from "./food-cn/FullBleedImage";
import FoodCnQuote, { Schema as FoodCnQuoteSchema, layoutId as FoodCnQuoteId, layoutName as FoodCnQuoteName, layoutDescription as FoodCnQuoteDesc } from "./food-cn/Quote";
import FoodCnTeamGrid, { Schema as FoodCnTeamGridSchema, layoutId as FoodCnTeamGridId, layoutName as FoodCnTeamGridName, layoutDescription as FoodCnTeamGridDesc } from "./food-cn/TeamGrid";
import FoodCnClosing, { Schema as FoodCnClosingSchema, layoutId as FoodCnClosingId, layoutName as FoodCnClosingName, layoutDescription as FoodCnClosingDesc } from "./food-cn/Closing";
import FinanceCnCover, { Schema as FinanceCnCoverSchema, layoutId as FinanceCnCoverId, layoutName as FinanceCnCoverName, layoutDescription as FinanceCnCoverDesc } from "./finance-cn/Cover";
import FinanceCnTableOfContents, { Schema as FinanceCnTableOfContentsSchema, layoutId as FinanceCnTableOfContentsId, layoutName as FinanceCnTableOfContentsName, layoutDescription as FinanceCnTableOfContentsDesc } from "./finance-cn/TableOfContents";
import FinanceCnSectionDivider, { Schema as FinanceCnSectionDividerSchema, layoutId as FinanceCnSectionDividerId, layoutName as FinanceCnSectionDividerName, layoutDescription as FinanceCnSectionDividerDesc } from "./finance-cn/SectionDivider";
import FinanceCnBigStatement, { Schema as FinanceCnBigStatementSchema, layoutId as FinanceCnBigStatementId, layoutName as FinanceCnBigStatementName, layoutDescription as FinanceCnBigStatementDesc } from "./finance-cn/BigStatement";
import FinanceCnThreePoints, { Schema as FinanceCnThreePointsSchema, layoutId as FinanceCnThreePointsId, layoutName as FinanceCnThreePointsName, layoutDescription as FinanceCnThreePointsDesc } from "./finance-cn/ThreePoints";
import FinanceCnFourFeatures, { Schema as FinanceCnFourFeaturesSchema, layoutId as FinanceCnFourFeaturesId, layoutName as FinanceCnFourFeaturesName, layoutDescription as FinanceCnFourFeaturesDesc } from "./finance-cn/FourFeatures";
import FinanceCnIconList, { Schema as FinanceCnIconListSchema, layoutId as FinanceCnIconListId, layoutName as FinanceCnIconListName, layoutDescription as FinanceCnIconListDesc } from "./finance-cn/IconList";
import FinanceCnKpiMetrics, { Schema as FinanceCnKpiMetricsSchema, layoutId as FinanceCnKpiMetricsId, layoutName as FinanceCnKpiMetricsName, layoutDescription as FinanceCnKpiMetricsDesc } from "./finance-cn/KpiMetrics";
import FinanceCnComparison, { Schema as FinanceCnComparisonSchema, layoutId as FinanceCnComparisonId, layoutName as FinanceCnComparisonName, layoutDescription as FinanceCnComparisonDesc } from "./finance-cn/Comparison";
import FinanceCnTimeline, { Schema as FinanceCnTimelineSchema, layoutId as FinanceCnTimelineId, layoutName as FinanceCnTimelineName, layoutDescription as FinanceCnTimelineDesc } from "./finance-cn/Timeline";
import FinanceCnProcessSteps, { Schema as FinanceCnProcessStepsSchema, layoutId as FinanceCnProcessStepsId, layoutName as FinanceCnProcessStepsName, layoutDescription as FinanceCnProcessStepsDesc } from "./finance-cn/ProcessSteps";
import FinanceCnRoadmap, { Schema as FinanceCnRoadmapSchema, layoutId as FinanceCnRoadmapId, layoutName as FinanceCnRoadmapName, layoutDescription as FinanceCnRoadmapDesc } from "./finance-cn/Roadmap";
import FinanceCnBarChart, { Schema as FinanceCnBarChartSchema, layoutId as FinanceCnBarChartId, layoutName as FinanceCnBarChartName, layoutDescription as FinanceCnBarChartDesc } from "./finance-cn/BarChart";
import FinanceCnPieDonut, { Schema as FinanceCnPieDonutSchema, layoutId as FinanceCnPieDonutId, layoutName as FinanceCnPieDonutName, layoutDescription as FinanceCnPieDonutDesc } from "./finance-cn/PieDonut";
import FinanceCnLineChart, { Schema as FinanceCnLineChartSchema, layoutId as FinanceCnLineChartId, layoutName as FinanceCnLineChartName, layoutDescription as FinanceCnLineChartDesc } from "./finance-cn/LineChart";
import FinanceCnDataTable, { Schema as FinanceCnDataTableSchema, layoutId as FinanceCnDataTableId, layoutName as FinanceCnDataTableName, layoutDescription as FinanceCnDataTableDesc } from "./finance-cn/DataTable";
import FinanceCnImageLeft, { Schema as FinanceCnImageLeftSchema, layoutId as FinanceCnImageLeftId, layoutName as FinanceCnImageLeftName, layoutDescription as FinanceCnImageLeftDesc } from "./finance-cn/ImageLeft";
import FinanceCnImageRight, { Schema as FinanceCnImageRightSchema, layoutId as FinanceCnImageRightId, layoutName as FinanceCnImageRightName, layoutDescription as FinanceCnImageRightDesc } from "./finance-cn/ImageRight";
import FinanceCnFullBleedImage, { Schema as FinanceCnFullBleedImageSchema, layoutId as FinanceCnFullBleedImageId, layoutName as FinanceCnFullBleedImageName, layoutDescription as FinanceCnFullBleedImageDesc } from "./finance-cn/FullBleedImage";
import FinanceCnQuote, { Schema as FinanceCnQuoteSchema, layoutId as FinanceCnQuoteId, layoutName as FinanceCnQuoteName, layoutDescription as FinanceCnQuoteDesc } from "./finance-cn/Quote";
import FinanceCnTeamGrid, { Schema as FinanceCnTeamGridSchema, layoutId as FinanceCnTeamGridId, layoutName as FinanceCnTeamGridName, layoutDescription as FinanceCnTeamGridDesc } from "./finance-cn/TeamGrid";
import FinanceCnClosing, { Schema as FinanceCnClosingSchema, layoutId as FinanceCnClosingId, layoutName as FinanceCnClosingName, layoutDescription as FinanceCnClosingDesc } from "./finance-cn/Closing";
import GovCnCover, { Schema as GovCnCoverSchema, layoutId as GovCnCoverId, layoutName as GovCnCoverName, layoutDescription as GovCnCoverDesc } from "./gov-cn/Cover";
import GovCnTableOfContents, { Schema as GovCnTableOfContentsSchema, layoutId as GovCnTableOfContentsId, layoutName as GovCnTableOfContentsName, layoutDescription as GovCnTableOfContentsDesc } from "./gov-cn/TableOfContents";
import GovCnSectionDivider, { Schema as GovCnSectionDividerSchema, layoutId as GovCnSectionDividerId, layoutName as GovCnSectionDividerName, layoutDescription as GovCnSectionDividerDesc } from "./gov-cn/SectionDivider";
import GovCnBigStatement, { Schema as GovCnBigStatementSchema, layoutId as GovCnBigStatementId, layoutName as GovCnBigStatementName, layoutDescription as GovCnBigStatementDesc } from "./gov-cn/BigStatement";
import GovCnThreePoints, { Schema as GovCnThreePointsSchema, layoutId as GovCnThreePointsId, layoutName as GovCnThreePointsName, layoutDescription as GovCnThreePointsDesc } from "./gov-cn/ThreePoints";
import GovCnFourFeatures, { Schema as GovCnFourFeaturesSchema, layoutId as GovCnFourFeaturesId, layoutName as GovCnFourFeaturesName, layoutDescription as GovCnFourFeaturesDesc } from "./gov-cn/FourFeatures";
import GovCnIconList, { Schema as GovCnIconListSchema, layoutId as GovCnIconListId, layoutName as GovCnIconListName, layoutDescription as GovCnIconListDesc } from "./gov-cn/IconList";
import GovCnKpiMetrics, { Schema as GovCnKpiMetricsSchema, layoutId as GovCnKpiMetricsId, layoutName as GovCnKpiMetricsName, layoutDescription as GovCnKpiMetricsDesc } from "./gov-cn/KpiMetrics";
import GovCnComparison, { Schema as GovCnComparisonSchema, layoutId as GovCnComparisonId, layoutName as GovCnComparisonName, layoutDescription as GovCnComparisonDesc } from "./gov-cn/Comparison";
import GovCnTimeline, { Schema as GovCnTimelineSchema, layoutId as GovCnTimelineId, layoutName as GovCnTimelineName, layoutDescription as GovCnTimelineDesc } from "./gov-cn/Timeline";
import GovCnProcessSteps, { Schema as GovCnProcessStepsSchema, layoutId as GovCnProcessStepsId, layoutName as GovCnProcessStepsName, layoutDescription as GovCnProcessStepsDesc } from "./gov-cn/ProcessSteps";
import GovCnRoadmap, { Schema as GovCnRoadmapSchema, layoutId as GovCnRoadmapId, layoutName as GovCnRoadmapName, layoutDescription as GovCnRoadmapDesc } from "./gov-cn/Roadmap";
import GovCnBarChart, { Schema as GovCnBarChartSchema, layoutId as GovCnBarChartId, layoutName as GovCnBarChartName, layoutDescription as GovCnBarChartDesc } from "./gov-cn/BarChart";
import GovCnPieDonut, { Schema as GovCnPieDonutSchema, layoutId as GovCnPieDonutId, layoutName as GovCnPieDonutName, layoutDescription as GovCnPieDonutDesc } from "./gov-cn/PieDonut";
import GovCnLineChart, { Schema as GovCnLineChartSchema, layoutId as GovCnLineChartId, layoutName as GovCnLineChartName, layoutDescription as GovCnLineChartDesc } from "./gov-cn/LineChart";
import GovCnDataTable, { Schema as GovCnDataTableSchema, layoutId as GovCnDataTableId, layoutName as GovCnDataTableName, layoutDescription as GovCnDataTableDesc } from "./gov-cn/DataTable";
import GovCnImageLeft, { Schema as GovCnImageLeftSchema, layoutId as GovCnImageLeftId, layoutName as GovCnImageLeftName, layoutDescription as GovCnImageLeftDesc } from "./gov-cn/ImageLeft";
import GovCnImageRight, { Schema as GovCnImageRightSchema, layoutId as GovCnImageRightId, layoutName as GovCnImageRightName, layoutDescription as GovCnImageRightDesc } from "./gov-cn/ImageRight";
import GovCnFullBleedImage, { Schema as GovCnFullBleedImageSchema, layoutId as GovCnFullBleedImageId, layoutName as GovCnFullBleedImageName, layoutDescription as GovCnFullBleedImageDesc } from "./gov-cn/FullBleedImage";
import GovCnQuote, { Schema as GovCnQuoteSchema, layoutId as GovCnQuoteId, layoutName as GovCnQuoteName, layoutDescription as GovCnQuoteDesc } from "./gov-cn/Quote";
import GovCnTeamGrid, { Schema as GovCnTeamGridSchema, layoutId as GovCnTeamGridId, layoutName as GovCnTeamGridName, layoutDescription as GovCnTeamGridDesc } from "./gov-cn/TeamGrid";
import GovCnClosing, { Schema as GovCnClosingSchema, layoutId as GovCnClosingId, layoutName as GovCnClosingName, layoutDescription as GovCnClosingDesc } from "./gov-cn/Closing";
import RealestateCnCover, { Schema as RealestateCnCoverSchema, layoutId as RealestateCnCoverId, layoutName as RealestateCnCoverName, layoutDescription as RealestateCnCoverDesc } from "./realestate-cn/Cover";
import RealestateCnTableOfContents, { Schema as RealestateCnTableOfContentsSchema, layoutId as RealestateCnTableOfContentsId, layoutName as RealestateCnTableOfContentsName, layoutDescription as RealestateCnTableOfContentsDesc } from "./realestate-cn/TableOfContents";
import RealestateCnSectionDivider, { Schema as RealestateCnSectionDividerSchema, layoutId as RealestateCnSectionDividerId, layoutName as RealestateCnSectionDividerName, layoutDescription as RealestateCnSectionDividerDesc } from "./realestate-cn/SectionDivider";
import RealestateCnBigStatement, { Schema as RealestateCnBigStatementSchema, layoutId as RealestateCnBigStatementId, layoutName as RealestateCnBigStatementName, layoutDescription as RealestateCnBigStatementDesc } from "./realestate-cn/BigStatement";
import RealestateCnThreePoints, { Schema as RealestateCnThreePointsSchema, layoutId as RealestateCnThreePointsId, layoutName as RealestateCnThreePointsName, layoutDescription as RealestateCnThreePointsDesc } from "./realestate-cn/ThreePoints";
import RealestateCnFourFeatures, { Schema as RealestateCnFourFeaturesSchema, layoutId as RealestateCnFourFeaturesId, layoutName as RealestateCnFourFeaturesName, layoutDescription as RealestateCnFourFeaturesDesc } from "./realestate-cn/FourFeatures";
import RealestateCnIconList, { Schema as RealestateCnIconListSchema, layoutId as RealestateCnIconListId, layoutName as RealestateCnIconListName, layoutDescription as RealestateCnIconListDesc } from "./realestate-cn/IconList";
import RealestateCnKpiMetrics, { Schema as RealestateCnKpiMetricsSchema, layoutId as RealestateCnKpiMetricsId, layoutName as RealestateCnKpiMetricsName, layoutDescription as RealestateCnKpiMetricsDesc } from "./realestate-cn/KpiMetrics";
import RealestateCnComparison, { Schema as RealestateCnComparisonSchema, layoutId as RealestateCnComparisonId, layoutName as RealestateCnComparisonName, layoutDescription as RealestateCnComparisonDesc } from "./realestate-cn/Comparison";
import RealestateCnTimeline, { Schema as RealestateCnTimelineSchema, layoutId as RealestateCnTimelineId, layoutName as RealestateCnTimelineName, layoutDescription as RealestateCnTimelineDesc } from "./realestate-cn/Timeline";
import RealestateCnProcessSteps, { Schema as RealestateCnProcessStepsSchema, layoutId as RealestateCnProcessStepsId, layoutName as RealestateCnProcessStepsName, layoutDescription as RealestateCnProcessStepsDesc } from "./realestate-cn/ProcessSteps";
import RealestateCnRoadmap, { Schema as RealestateCnRoadmapSchema, layoutId as RealestateCnRoadmapId, layoutName as RealestateCnRoadmapName, layoutDescription as RealestateCnRoadmapDesc } from "./realestate-cn/Roadmap";
import RealestateCnBarChart, { Schema as RealestateCnBarChartSchema, layoutId as RealestateCnBarChartId, layoutName as RealestateCnBarChartName, layoutDescription as RealestateCnBarChartDesc } from "./realestate-cn/BarChart";
import RealestateCnPieDonut, { Schema as RealestateCnPieDonutSchema, layoutId as RealestateCnPieDonutId, layoutName as RealestateCnPieDonutName, layoutDescription as RealestateCnPieDonutDesc } from "./realestate-cn/PieDonut";
import RealestateCnLineChart, { Schema as RealestateCnLineChartSchema, layoutId as RealestateCnLineChartId, layoutName as RealestateCnLineChartName, layoutDescription as RealestateCnLineChartDesc } from "./realestate-cn/LineChart";
import RealestateCnDataTable, { Schema as RealestateCnDataTableSchema, layoutId as RealestateCnDataTableId, layoutName as RealestateCnDataTableName, layoutDescription as RealestateCnDataTableDesc } from "./realestate-cn/DataTable";
import RealestateCnImageLeft, { Schema as RealestateCnImageLeftSchema, layoutId as RealestateCnImageLeftId, layoutName as RealestateCnImageLeftName, layoutDescription as RealestateCnImageLeftDesc } from "./realestate-cn/ImageLeft";
import RealestateCnImageRight, { Schema as RealestateCnImageRightSchema, layoutId as RealestateCnImageRightId, layoutName as RealestateCnImageRightName, layoutDescription as RealestateCnImageRightDesc } from "./realestate-cn/ImageRight";
import RealestateCnFullBleedImage, { Schema as RealestateCnFullBleedImageSchema, layoutId as RealestateCnFullBleedImageId, layoutName as RealestateCnFullBleedImageName, layoutDescription as RealestateCnFullBleedImageDesc } from "./realestate-cn/FullBleedImage";
import RealestateCnQuote, { Schema as RealestateCnQuoteSchema, layoutId as RealestateCnQuoteId, layoutName as RealestateCnQuoteName, layoutDescription as RealestateCnQuoteDesc } from "./realestate-cn/Quote";
import RealestateCnTeamGrid, { Schema as RealestateCnTeamGridSchema, layoutId as RealestateCnTeamGridId, layoutName as RealestateCnTeamGridName, layoutDescription as RealestateCnTeamGridDesc } from "./realestate-cn/TeamGrid";
import RealestateCnClosing, { Schema as RealestateCnClosingSchema, layoutId as RealestateCnClosingId, layoutName as RealestateCnClosingName, layoutDescription as RealestateCnClosingDesc } from "./realestate-cn/Closing";
import CultureCnCover, { Schema as CultureCnCoverSchema, layoutId as CultureCnCoverId, layoutName as CultureCnCoverName, layoutDescription as CultureCnCoverDesc } from "./culture-cn/Cover";
import CultureCnTableOfContents, { Schema as CultureCnTableOfContentsSchema, layoutId as CultureCnTableOfContentsId, layoutName as CultureCnTableOfContentsName, layoutDescription as CultureCnTableOfContentsDesc } from "./culture-cn/TableOfContents";
import CultureCnSectionDivider, { Schema as CultureCnSectionDividerSchema, layoutId as CultureCnSectionDividerId, layoutName as CultureCnSectionDividerName, layoutDescription as CultureCnSectionDividerDesc } from "./culture-cn/SectionDivider";
import CultureCnBigStatement, { Schema as CultureCnBigStatementSchema, layoutId as CultureCnBigStatementId, layoutName as CultureCnBigStatementName, layoutDescription as CultureCnBigStatementDesc } from "./culture-cn/BigStatement";
import CultureCnThreePoints, { Schema as CultureCnThreePointsSchema, layoutId as CultureCnThreePointsId, layoutName as CultureCnThreePointsName, layoutDescription as CultureCnThreePointsDesc } from "./culture-cn/ThreePoints";
import CultureCnFourFeatures, { Schema as CultureCnFourFeaturesSchema, layoutId as CultureCnFourFeaturesId, layoutName as CultureCnFourFeaturesName, layoutDescription as CultureCnFourFeaturesDesc } from "./culture-cn/FourFeatures";
import CultureCnIconList, { Schema as CultureCnIconListSchema, layoutId as CultureCnIconListId, layoutName as CultureCnIconListName, layoutDescription as CultureCnIconListDesc } from "./culture-cn/IconList";
import CultureCnKpiMetrics, { Schema as CultureCnKpiMetricsSchema, layoutId as CultureCnKpiMetricsId, layoutName as CultureCnKpiMetricsName, layoutDescription as CultureCnKpiMetricsDesc } from "./culture-cn/KpiMetrics";
import CultureCnComparison, { Schema as CultureCnComparisonSchema, layoutId as CultureCnComparisonId, layoutName as CultureCnComparisonName, layoutDescription as CultureCnComparisonDesc } from "./culture-cn/Comparison";
import CultureCnTimeline, { Schema as CultureCnTimelineSchema, layoutId as CultureCnTimelineId, layoutName as CultureCnTimelineName, layoutDescription as CultureCnTimelineDesc } from "./culture-cn/Timeline";
import CultureCnProcessSteps, { Schema as CultureCnProcessStepsSchema, layoutId as CultureCnProcessStepsId, layoutName as CultureCnProcessStepsName, layoutDescription as CultureCnProcessStepsDesc } from "./culture-cn/ProcessSteps";
import CultureCnRoadmap, { Schema as CultureCnRoadmapSchema, layoutId as CultureCnRoadmapId, layoutName as CultureCnRoadmapName, layoutDescription as CultureCnRoadmapDesc } from "./culture-cn/Roadmap";
import CultureCnBarChart, { Schema as CultureCnBarChartSchema, layoutId as CultureCnBarChartId, layoutName as CultureCnBarChartName, layoutDescription as CultureCnBarChartDesc } from "./culture-cn/BarChart";
import CultureCnPieDonut, { Schema as CultureCnPieDonutSchema, layoutId as CultureCnPieDonutId, layoutName as CultureCnPieDonutName, layoutDescription as CultureCnPieDonutDesc } from "./culture-cn/PieDonut";
import CultureCnLineChart, { Schema as CultureCnLineChartSchema, layoutId as CultureCnLineChartId, layoutName as CultureCnLineChartName, layoutDescription as CultureCnLineChartDesc } from "./culture-cn/LineChart";
import CultureCnDataTable, { Schema as CultureCnDataTableSchema, layoutId as CultureCnDataTableId, layoutName as CultureCnDataTableName, layoutDescription as CultureCnDataTableDesc } from "./culture-cn/DataTable";
import CultureCnImageLeft, { Schema as CultureCnImageLeftSchema, layoutId as CultureCnImageLeftId, layoutName as CultureCnImageLeftName, layoutDescription as CultureCnImageLeftDesc } from "./culture-cn/ImageLeft";
import CultureCnImageRight, { Schema as CultureCnImageRightSchema, layoutId as CultureCnImageRightId, layoutName as CultureCnImageRightName, layoutDescription as CultureCnImageRightDesc } from "./culture-cn/ImageRight";
import CultureCnFullBleedImage, { Schema as CultureCnFullBleedImageSchema, layoutId as CultureCnFullBleedImageId, layoutName as CultureCnFullBleedImageName, layoutDescription as CultureCnFullBleedImageDesc } from "./culture-cn/FullBleedImage";
import CultureCnQuote, { Schema as CultureCnQuoteSchema, layoutId as CultureCnQuoteId, layoutName as CultureCnQuoteName, layoutDescription as CultureCnQuoteDesc } from "./culture-cn/Quote";
import CultureCnTeamGrid, { Schema as CultureCnTeamGridSchema, layoutId as CultureCnTeamGridId, layoutName as CultureCnTeamGridName, layoutDescription as CultureCnTeamGridDesc } from "./culture-cn/TeamGrid";
import CultureCnClosing, { Schema as CultureCnClosingSchema, layoutId as CultureCnClosingId, layoutName as CultureCnClosingName, layoutDescription as CultureCnClosingDesc } from "./culture-cn/Closing";
import GreenCnCover, { Schema as GreenCnCoverSchema, layoutId as GreenCnCoverId, layoutName as GreenCnCoverName, layoutDescription as GreenCnCoverDesc } from "./green-cn/Cover";
import GreenCnTableOfContents, { Schema as GreenCnTableOfContentsSchema, layoutId as GreenCnTableOfContentsId, layoutName as GreenCnTableOfContentsName, layoutDescription as GreenCnTableOfContentsDesc } from "./green-cn/TableOfContents";
import GreenCnSectionDivider, { Schema as GreenCnSectionDividerSchema, layoutId as GreenCnSectionDividerId, layoutName as GreenCnSectionDividerName, layoutDescription as GreenCnSectionDividerDesc } from "./green-cn/SectionDivider";
import GreenCnBigStatement, { Schema as GreenCnBigStatementSchema, layoutId as GreenCnBigStatementId, layoutName as GreenCnBigStatementName, layoutDescription as GreenCnBigStatementDesc } from "./green-cn/BigStatement";
import GreenCnThreePoints, { Schema as GreenCnThreePointsSchema, layoutId as GreenCnThreePointsId, layoutName as GreenCnThreePointsName, layoutDescription as GreenCnThreePointsDesc } from "./green-cn/ThreePoints";
import GreenCnFourFeatures, { Schema as GreenCnFourFeaturesSchema, layoutId as GreenCnFourFeaturesId, layoutName as GreenCnFourFeaturesName, layoutDescription as GreenCnFourFeaturesDesc } from "./green-cn/FourFeatures";
import GreenCnIconList, { Schema as GreenCnIconListSchema, layoutId as GreenCnIconListId, layoutName as GreenCnIconListName, layoutDescription as GreenCnIconListDesc } from "./green-cn/IconList";
import GreenCnKpiMetrics, { Schema as GreenCnKpiMetricsSchema, layoutId as GreenCnKpiMetricsId, layoutName as GreenCnKpiMetricsName, layoutDescription as GreenCnKpiMetricsDesc } from "./green-cn/KpiMetrics";
import GreenCnComparison, { Schema as GreenCnComparisonSchema, layoutId as GreenCnComparisonId, layoutName as GreenCnComparisonName, layoutDescription as GreenCnComparisonDesc } from "./green-cn/Comparison";
import GreenCnTimeline, { Schema as GreenCnTimelineSchema, layoutId as GreenCnTimelineId, layoutName as GreenCnTimelineName, layoutDescription as GreenCnTimelineDesc } from "./green-cn/Timeline";
import GreenCnProcessSteps, { Schema as GreenCnProcessStepsSchema, layoutId as GreenCnProcessStepsId, layoutName as GreenCnProcessStepsName, layoutDescription as GreenCnProcessStepsDesc } from "./green-cn/ProcessSteps";
import GreenCnRoadmap, { Schema as GreenCnRoadmapSchema, layoutId as GreenCnRoadmapId, layoutName as GreenCnRoadmapName, layoutDescription as GreenCnRoadmapDesc } from "./green-cn/Roadmap";
import GreenCnBarChart, { Schema as GreenCnBarChartSchema, layoutId as GreenCnBarChartId, layoutName as GreenCnBarChartName, layoutDescription as GreenCnBarChartDesc } from "./green-cn/BarChart";
import GreenCnPieDonut, { Schema as GreenCnPieDonutSchema, layoutId as GreenCnPieDonutId, layoutName as GreenCnPieDonutName, layoutDescription as GreenCnPieDonutDesc } from "./green-cn/PieDonut";
import GreenCnLineChart, { Schema as GreenCnLineChartSchema, layoutId as GreenCnLineChartId, layoutName as GreenCnLineChartName, layoutDescription as GreenCnLineChartDesc } from "./green-cn/LineChart";
import GreenCnDataTable, { Schema as GreenCnDataTableSchema, layoutId as GreenCnDataTableId, layoutName as GreenCnDataTableName, layoutDescription as GreenCnDataTableDesc } from "./green-cn/DataTable";
import GreenCnImageLeft, { Schema as GreenCnImageLeftSchema, layoutId as GreenCnImageLeftId, layoutName as GreenCnImageLeftName, layoutDescription as GreenCnImageLeftDesc } from "./green-cn/ImageLeft";
import GreenCnImageRight, { Schema as GreenCnImageRightSchema, layoutId as GreenCnImageRightId, layoutName as GreenCnImageRightName, layoutDescription as GreenCnImageRightDesc } from "./green-cn/ImageRight";
import GreenCnFullBleedImage, { Schema as GreenCnFullBleedImageSchema, layoutId as GreenCnFullBleedImageId, layoutName as GreenCnFullBleedImageName, layoutDescription as GreenCnFullBleedImageDesc } from "./green-cn/FullBleedImage";
import GreenCnQuote, { Schema as GreenCnQuoteSchema, layoutId as GreenCnQuoteId, layoutName as GreenCnQuoteName, layoutDescription as GreenCnQuoteDesc } from "./green-cn/Quote";
import GreenCnTeamGrid, { Schema as GreenCnTeamGridSchema, layoutId as GreenCnTeamGridId, layoutName as GreenCnTeamGridName, layoutDescription as GreenCnTeamGridDesc } from "./green-cn/TeamGrid";
import GreenCnClosing, { Schema as GreenCnClosingSchema, layoutId as GreenCnClosingId, layoutName as GreenCnClosingName, layoutDescription as GreenCnClosingDesc } from "./green-cn/Closing";
import RetailCnCover, { Schema as RetailCnCoverSchema, layoutId as RetailCnCoverId, layoutName as RetailCnCoverName, layoutDescription as RetailCnCoverDesc } from "./retail-cn/Cover";
import RetailCnTableOfContents, { Schema as RetailCnTableOfContentsSchema, layoutId as RetailCnTableOfContentsId, layoutName as RetailCnTableOfContentsName, layoutDescription as RetailCnTableOfContentsDesc } from "./retail-cn/TableOfContents";
import RetailCnSectionDivider, { Schema as RetailCnSectionDividerSchema, layoutId as RetailCnSectionDividerId, layoutName as RetailCnSectionDividerName, layoutDescription as RetailCnSectionDividerDesc } from "./retail-cn/SectionDivider";
import RetailCnBigStatement, { Schema as RetailCnBigStatementSchema, layoutId as RetailCnBigStatementId, layoutName as RetailCnBigStatementName, layoutDescription as RetailCnBigStatementDesc } from "./retail-cn/BigStatement";
import RetailCnThreePoints, { Schema as RetailCnThreePointsSchema, layoutId as RetailCnThreePointsId, layoutName as RetailCnThreePointsName, layoutDescription as RetailCnThreePointsDesc } from "./retail-cn/ThreePoints";
import RetailCnFourFeatures, { Schema as RetailCnFourFeaturesSchema, layoutId as RetailCnFourFeaturesId, layoutName as RetailCnFourFeaturesName, layoutDescription as RetailCnFourFeaturesDesc } from "./retail-cn/FourFeatures";
import RetailCnIconList, { Schema as RetailCnIconListSchema, layoutId as RetailCnIconListId, layoutName as RetailCnIconListName, layoutDescription as RetailCnIconListDesc } from "./retail-cn/IconList";
import RetailCnKpiMetrics, { Schema as RetailCnKpiMetricsSchema, layoutId as RetailCnKpiMetricsId, layoutName as RetailCnKpiMetricsName, layoutDescription as RetailCnKpiMetricsDesc } from "./retail-cn/KpiMetrics";
import RetailCnComparison, { Schema as RetailCnComparisonSchema, layoutId as RetailCnComparisonId, layoutName as RetailCnComparisonName, layoutDescription as RetailCnComparisonDesc } from "./retail-cn/Comparison";
import RetailCnTimeline, { Schema as RetailCnTimelineSchema, layoutId as RetailCnTimelineId, layoutName as RetailCnTimelineName, layoutDescription as RetailCnTimelineDesc } from "./retail-cn/Timeline";
import RetailCnProcessSteps, { Schema as RetailCnProcessStepsSchema, layoutId as RetailCnProcessStepsId, layoutName as RetailCnProcessStepsName, layoutDescription as RetailCnProcessStepsDesc } from "./retail-cn/ProcessSteps";
import RetailCnRoadmap, { Schema as RetailCnRoadmapSchema, layoutId as RetailCnRoadmapId, layoutName as RetailCnRoadmapName, layoutDescription as RetailCnRoadmapDesc } from "./retail-cn/Roadmap";
import RetailCnBarChart, { Schema as RetailCnBarChartSchema, layoutId as RetailCnBarChartId, layoutName as RetailCnBarChartName, layoutDescription as RetailCnBarChartDesc } from "./retail-cn/BarChart";
import RetailCnPieDonut, { Schema as RetailCnPieDonutSchema, layoutId as RetailCnPieDonutId, layoutName as RetailCnPieDonutName, layoutDescription as RetailCnPieDonutDesc } from "./retail-cn/PieDonut";
import RetailCnLineChart, { Schema as RetailCnLineChartSchema, layoutId as RetailCnLineChartId, layoutName as RetailCnLineChartName, layoutDescription as RetailCnLineChartDesc } from "./retail-cn/LineChart";
import RetailCnDataTable, { Schema as RetailCnDataTableSchema, layoutId as RetailCnDataTableId, layoutName as RetailCnDataTableName, layoutDescription as RetailCnDataTableDesc } from "./retail-cn/DataTable";
import RetailCnImageLeft, { Schema as RetailCnImageLeftSchema, layoutId as RetailCnImageLeftId, layoutName as RetailCnImageLeftName, layoutDescription as RetailCnImageLeftDesc } from "./retail-cn/ImageLeft";
import RetailCnImageRight, { Schema as RetailCnImageRightSchema, layoutId as RetailCnImageRightId, layoutName as RetailCnImageRightName, layoutDescription as RetailCnImageRightDesc } from "./retail-cn/ImageRight";
import RetailCnFullBleedImage, { Schema as RetailCnFullBleedImageSchema, layoutId as RetailCnFullBleedImageId, layoutName as RetailCnFullBleedImageName, layoutDescription as RetailCnFullBleedImageDesc } from "./retail-cn/FullBleedImage";
import RetailCnQuote, { Schema as RetailCnQuoteSchema, layoutId as RetailCnQuoteId, layoutName as RetailCnQuoteName, layoutDescription as RetailCnQuoteDesc } from "./retail-cn/Quote";
import RetailCnTeamGrid, { Schema as RetailCnTeamGridSchema, layoutId as RetailCnTeamGridId, layoutName as RetailCnTeamGridName, layoutDescription as RetailCnTeamGridDesc } from "./retail-cn/TeamGrid";
import RetailCnClosing, { Schema as RetailCnClosingSchema, layoutId as RetailCnClosingId, layoutName as RetailCnClosingName, layoutDescription as RetailCnClosingDesc } from "./retail-cn/Closing";
import TravelCnCover, { Schema as TravelCnCoverSchema, layoutId as TravelCnCoverId, layoutName as TravelCnCoverName, layoutDescription as TravelCnCoverDesc } from "./travel-cn/Cover";
import TravelCnTableOfContents, { Schema as TravelCnTableOfContentsSchema, layoutId as TravelCnTableOfContentsId, layoutName as TravelCnTableOfContentsName, layoutDescription as TravelCnTableOfContentsDesc } from "./travel-cn/TableOfContents";
import TravelCnSectionDivider, { Schema as TravelCnSectionDividerSchema, layoutId as TravelCnSectionDividerId, layoutName as TravelCnSectionDividerName, layoutDescription as TravelCnSectionDividerDesc } from "./travel-cn/SectionDivider";
import TravelCnBigStatement, { Schema as TravelCnBigStatementSchema, layoutId as TravelCnBigStatementId, layoutName as TravelCnBigStatementName, layoutDescription as TravelCnBigStatementDesc } from "./travel-cn/BigStatement";
import TravelCnThreePoints, { Schema as TravelCnThreePointsSchema, layoutId as TravelCnThreePointsId, layoutName as TravelCnThreePointsName, layoutDescription as TravelCnThreePointsDesc } from "./travel-cn/ThreePoints";
import TravelCnFourFeatures, { Schema as TravelCnFourFeaturesSchema, layoutId as TravelCnFourFeaturesId, layoutName as TravelCnFourFeaturesName, layoutDescription as TravelCnFourFeaturesDesc } from "./travel-cn/FourFeatures";
import TravelCnIconList, { Schema as TravelCnIconListSchema, layoutId as TravelCnIconListId, layoutName as TravelCnIconListName, layoutDescription as TravelCnIconListDesc } from "./travel-cn/IconList";
import TravelCnKpiMetrics, { Schema as TravelCnKpiMetricsSchema, layoutId as TravelCnKpiMetricsId, layoutName as TravelCnKpiMetricsName, layoutDescription as TravelCnKpiMetricsDesc } from "./travel-cn/KpiMetrics";
import TravelCnComparison, { Schema as TravelCnComparisonSchema, layoutId as TravelCnComparisonId, layoutName as TravelCnComparisonName, layoutDescription as TravelCnComparisonDesc } from "./travel-cn/Comparison";
import TravelCnTimeline, { Schema as TravelCnTimelineSchema, layoutId as TravelCnTimelineId, layoutName as TravelCnTimelineName, layoutDescription as TravelCnTimelineDesc } from "./travel-cn/Timeline";
import TravelCnProcessSteps, { Schema as TravelCnProcessStepsSchema, layoutId as TravelCnProcessStepsId, layoutName as TravelCnProcessStepsName, layoutDescription as TravelCnProcessStepsDesc } from "./travel-cn/ProcessSteps";
import TravelCnRoadmap, { Schema as TravelCnRoadmapSchema, layoutId as TravelCnRoadmapId, layoutName as TravelCnRoadmapName, layoutDescription as TravelCnRoadmapDesc } from "./travel-cn/Roadmap";
import TravelCnBarChart, { Schema as TravelCnBarChartSchema, layoutId as TravelCnBarChartId, layoutName as TravelCnBarChartName, layoutDescription as TravelCnBarChartDesc } from "./travel-cn/BarChart";
import TravelCnPieDonut, { Schema as TravelCnPieDonutSchema, layoutId as TravelCnPieDonutId, layoutName as TravelCnPieDonutName, layoutDescription as TravelCnPieDonutDesc } from "./travel-cn/PieDonut";
import TravelCnLineChart, { Schema as TravelCnLineChartSchema, layoutId as TravelCnLineChartId, layoutName as TravelCnLineChartName, layoutDescription as TravelCnLineChartDesc } from "./travel-cn/LineChart";
import TravelCnDataTable, { Schema as TravelCnDataTableSchema, layoutId as TravelCnDataTableId, layoutName as TravelCnDataTableName, layoutDescription as TravelCnDataTableDesc } from "./travel-cn/DataTable";
import TravelCnImageLeft, { Schema as TravelCnImageLeftSchema, layoutId as TravelCnImageLeftId, layoutName as TravelCnImageLeftName, layoutDescription as TravelCnImageLeftDesc } from "./travel-cn/ImageLeft";
import TravelCnImageRight, { Schema as TravelCnImageRightSchema, layoutId as TravelCnImageRightId, layoutName as TravelCnImageRightName, layoutDescription as TravelCnImageRightDesc } from "./travel-cn/ImageRight";
import TravelCnFullBleedImage, { Schema as TravelCnFullBleedImageSchema, layoutId as TravelCnFullBleedImageId, layoutName as TravelCnFullBleedImageName, layoutDescription as TravelCnFullBleedImageDesc } from "./travel-cn/FullBleedImage";
import TravelCnQuote, { Schema as TravelCnQuoteSchema, layoutId as TravelCnQuoteId, layoutName as TravelCnQuoteName, layoutDescription as TravelCnQuoteDesc } from "./travel-cn/Quote";
import TravelCnTeamGrid, { Schema as TravelCnTeamGridSchema, layoutId as TravelCnTeamGridId, layoutName as TravelCnTeamGridName, layoutDescription as TravelCnTeamGridDesc } from "./travel-cn/TeamGrid";
import TravelCnClosing, { Schema as TravelCnClosingSchema, layoutId as TravelCnClosingId, layoutName as TravelCnClosingName, layoutDescription as TravelCnClosingDesc } from "./travel-cn/Closing";
import ManufacturingCnCover, { Schema as ManufacturingCnCoverSchema, layoutId as ManufacturingCnCoverId, layoutName as ManufacturingCnCoverName, layoutDescription as ManufacturingCnCoverDesc } from "./manufacturing-cn/Cover";
import ManufacturingCnTableOfContents, { Schema as ManufacturingCnTableOfContentsSchema, layoutId as ManufacturingCnTableOfContentsId, layoutName as ManufacturingCnTableOfContentsName, layoutDescription as ManufacturingCnTableOfContentsDesc } from "./manufacturing-cn/TableOfContents";
import ManufacturingCnSectionDivider, { Schema as ManufacturingCnSectionDividerSchema, layoutId as ManufacturingCnSectionDividerId, layoutName as ManufacturingCnSectionDividerName, layoutDescription as ManufacturingCnSectionDividerDesc } from "./manufacturing-cn/SectionDivider";
import ManufacturingCnBigStatement, { Schema as ManufacturingCnBigStatementSchema, layoutId as ManufacturingCnBigStatementId, layoutName as ManufacturingCnBigStatementName, layoutDescription as ManufacturingCnBigStatementDesc } from "./manufacturing-cn/BigStatement";
import ManufacturingCnThreePoints, { Schema as ManufacturingCnThreePointsSchema, layoutId as ManufacturingCnThreePointsId, layoutName as ManufacturingCnThreePointsName, layoutDescription as ManufacturingCnThreePointsDesc } from "./manufacturing-cn/ThreePoints";
import ManufacturingCnFourFeatures, { Schema as ManufacturingCnFourFeaturesSchema, layoutId as ManufacturingCnFourFeaturesId, layoutName as ManufacturingCnFourFeaturesName, layoutDescription as ManufacturingCnFourFeaturesDesc } from "./manufacturing-cn/FourFeatures";
import ManufacturingCnIconList, { Schema as ManufacturingCnIconListSchema, layoutId as ManufacturingCnIconListId, layoutName as ManufacturingCnIconListName, layoutDescription as ManufacturingCnIconListDesc } from "./manufacturing-cn/IconList";
import ManufacturingCnKpiMetrics, { Schema as ManufacturingCnKpiMetricsSchema, layoutId as ManufacturingCnKpiMetricsId, layoutName as ManufacturingCnKpiMetricsName, layoutDescription as ManufacturingCnKpiMetricsDesc } from "./manufacturing-cn/KpiMetrics";
import ManufacturingCnComparison, { Schema as ManufacturingCnComparisonSchema, layoutId as ManufacturingCnComparisonId, layoutName as ManufacturingCnComparisonName, layoutDescription as ManufacturingCnComparisonDesc } from "./manufacturing-cn/Comparison";
import ManufacturingCnTimeline, { Schema as ManufacturingCnTimelineSchema, layoutId as ManufacturingCnTimelineId, layoutName as ManufacturingCnTimelineName, layoutDescription as ManufacturingCnTimelineDesc } from "./manufacturing-cn/Timeline";
import ManufacturingCnProcessSteps, { Schema as ManufacturingCnProcessStepsSchema, layoutId as ManufacturingCnProcessStepsId, layoutName as ManufacturingCnProcessStepsName, layoutDescription as ManufacturingCnProcessStepsDesc } from "./manufacturing-cn/ProcessSteps";
import ManufacturingCnRoadmap, { Schema as ManufacturingCnRoadmapSchema, layoutId as ManufacturingCnRoadmapId, layoutName as ManufacturingCnRoadmapName, layoutDescription as ManufacturingCnRoadmapDesc } from "./manufacturing-cn/Roadmap";
import ManufacturingCnBarChart, { Schema as ManufacturingCnBarChartSchema, layoutId as ManufacturingCnBarChartId, layoutName as ManufacturingCnBarChartName, layoutDescription as ManufacturingCnBarChartDesc } from "./manufacturing-cn/BarChart";
import ManufacturingCnPieDonut, { Schema as ManufacturingCnPieDonutSchema, layoutId as ManufacturingCnPieDonutId, layoutName as ManufacturingCnPieDonutName, layoutDescription as ManufacturingCnPieDonutDesc } from "./manufacturing-cn/PieDonut";
import ManufacturingCnLineChart, { Schema as ManufacturingCnLineChartSchema, layoutId as ManufacturingCnLineChartId, layoutName as ManufacturingCnLineChartName, layoutDescription as ManufacturingCnLineChartDesc } from "./manufacturing-cn/LineChart";
import ManufacturingCnDataTable, { Schema as ManufacturingCnDataTableSchema, layoutId as ManufacturingCnDataTableId, layoutName as ManufacturingCnDataTableName, layoutDescription as ManufacturingCnDataTableDesc } from "./manufacturing-cn/DataTable";
import ManufacturingCnImageLeft, { Schema as ManufacturingCnImageLeftSchema, layoutId as ManufacturingCnImageLeftId, layoutName as ManufacturingCnImageLeftName, layoutDescription as ManufacturingCnImageLeftDesc } from "./manufacturing-cn/ImageLeft";
import ManufacturingCnImageRight, { Schema as ManufacturingCnImageRightSchema, layoutId as ManufacturingCnImageRightId, layoutName as ManufacturingCnImageRightName, layoutDescription as ManufacturingCnImageRightDesc } from "./manufacturing-cn/ImageRight";
import ManufacturingCnFullBleedImage, { Schema as ManufacturingCnFullBleedImageSchema, layoutId as ManufacturingCnFullBleedImageId, layoutName as ManufacturingCnFullBleedImageName, layoutDescription as ManufacturingCnFullBleedImageDesc } from "./manufacturing-cn/FullBleedImage";
import ManufacturingCnQuote, { Schema as ManufacturingCnQuoteSchema, layoutId as ManufacturingCnQuoteId, layoutName as ManufacturingCnQuoteName, layoutDescription as ManufacturingCnQuoteDesc } from "./manufacturing-cn/Quote";
import ManufacturingCnTeamGrid, { Schema as ManufacturingCnTeamGridSchema, layoutId as ManufacturingCnTeamGridId, layoutName as ManufacturingCnTeamGridName, layoutDescription as ManufacturingCnTeamGridDesc } from "./manufacturing-cn/TeamGrid";
import ManufacturingCnClosing, { Schema as ManufacturingCnClosingSchema, layoutId as ManufacturingCnClosingId, layoutName as ManufacturingCnClosingName, layoutDescription as ManufacturingCnClosingDesc } from "./manufacturing-cn/Closing";

import businessCnSettings from "./business-cn/settings.json";
import techCnSettings from "./tech-cn/settings.json";
import medicalCnSettings from "./medical-cn/settings.json";
import educationCnSettings from "./education-cn/settings.json";
import foodCnSettings from "./food-cn/settings.json";
import financeCnSettings from "./finance-cn/settings.json";
import govCnSettings from "./gov-cn/settings.json";
import realestateCnSettings from "./realestate-cn/settings.json";
import cultureCnSettings from "./culture-cn/settings.json";
import greenCnSettings from "./green-cn/settings.json";
import retailCnSettings from "./retail-cn/settings.json";
import travelCnSettings from "./travel-cn/settings.json";
import manufacturingCnSettings from "./manufacturing-cn/settings.json";

export const businessCnTemplates: TemplateWithData[] = [
    createTemplateEntry(BusinessCnCover, BusinessCnCoverSchema, BusinessCnCoverId, BusinessCnCoverName, BusinessCnCoverDesc, "business-cn", "Cover"),
    createTemplateEntry(BusinessCnTableOfContents, BusinessCnTableOfContentsSchema, BusinessCnTableOfContentsId, BusinessCnTableOfContentsName, BusinessCnTableOfContentsDesc, "business-cn", "TableOfContents"),
    createTemplateEntry(BusinessCnSectionDivider, BusinessCnSectionDividerSchema, BusinessCnSectionDividerId, BusinessCnSectionDividerName, BusinessCnSectionDividerDesc, "business-cn", "SectionDivider"),
    createTemplateEntry(BusinessCnBigStatement, BusinessCnBigStatementSchema, BusinessCnBigStatementId, BusinessCnBigStatementName, BusinessCnBigStatementDesc, "business-cn", "BigStatement"),
    createTemplateEntry(BusinessCnThreePoints, BusinessCnThreePointsSchema, BusinessCnThreePointsId, BusinessCnThreePointsName, BusinessCnThreePointsDesc, "business-cn", "ThreePoints"),
    createTemplateEntry(BusinessCnFourFeatures, BusinessCnFourFeaturesSchema, BusinessCnFourFeaturesId, BusinessCnFourFeaturesName, BusinessCnFourFeaturesDesc, "business-cn", "FourFeatures"),
    createTemplateEntry(BusinessCnIconList, BusinessCnIconListSchema, BusinessCnIconListId, BusinessCnIconListName, BusinessCnIconListDesc, "business-cn", "IconList"),
    createTemplateEntry(BusinessCnKpiMetrics, BusinessCnKpiMetricsSchema, BusinessCnKpiMetricsId, BusinessCnKpiMetricsName, BusinessCnKpiMetricsDesc, "business-cn", "KpiMetrics"),
    createTemplateEntry(BusinessCnComparison, BusinessCnComparisonSchema, BusinessCnComparisonId, BusinessCnComparisonName, BusinessCnComparisonDesc, "business-cn", "Comparison"),
    createTemplateEntry(BusinessCnTimeline, BusinessCnTimelineSchema, BusinessCnTimelineId, BusinessCnTimelineName, BusinessCnTimelineDesc, "business-cn", "Timeline"),
    createTemplateEntry(BusinessCnProcessSteps, BusinessCnProcessStepsSchema, BusinessCnProcessStepsId, BusinessCnProcessStepsName, BusinessCnProcessStepsDesc, "business-cn", "ProcessSteps"),
    createTemplateEntry(BusinessCnRoadmap, BusinessCnRoadmapSchema, BusinessCnRoadmapId, BusinessCnRoadmapName, BusinessCnRoadmapDesc, "business-cn", "Roadmap"),
    createTemplateEntry(BusinessCnBarChart, BusinessCnBarChartSchema, BusinessCnBarChartId, BusinessCnBarChartName, BusinessCnBarChartDesc, "business-cn", "BarChart"),
    createTemplateEntry(BusinessCnPieDonut, BusinessCnPieDonutSchema, BusinessCnPieDonutId, BusinessCnPieDonutName, BusinessCnPieDonutDesc, "business-cn", "PieDonut"),
    createTemplateEntry(BusinessCnLineChart, BusinessCnLineChartSchema, BusinessCnLineChartId, BusinessCnLineChartName, BusinessCnLineChartDesc, "business-cn", "LineChart"),
    createTemplateEntry(BusinessCnDataTable, BusinessCnDataTableSchema, BusinessCnDataTableId, BusinessCnDataTableName, BusinessCnDataTableDesc, "business-cn", "DataTable"),
    createTemplateEntry(BusinessCnImageLeft, BusinessCnImageLeftSchema, BusinessCnImageLeftId, BusinessCnImageLeftName, BusinessCnImageLeftDesc, "business-cn", "ImageLeft"),
    createTemplateEntry(BusinessCnImageRight, BusinessCnImageRightSchema, BusinessCnImageRightId, BusinessCnImageRightName, BusinessCnImageRightDesc, "business-cn", "ImageRight"),
    createTemplateEntry(BusinessCnFullBleedImage, BusinessCnFullBleedImageSchema, BusinessCnFullBleedImageId, BusinessCnFullBleedImageName, BusinessCnFullBleedImageDesc, "business-cn", "FullBleedImage"),
    createTemplateEntry(BusinessCnQuote, BusinessCnQuoteSchema, BusinessCnQuoteId, BusinessCnQuoteName, BusinessCnQuoteDesc, "business-cn", "Quote"),
    createTemplateEntry(BusinessCnTeamGrid, BusinessCnTeamGridSchema, BusinessCnTeamGridId, BusinessCnTeamGridName, BusinessCnTeamGridDesc, "business-cn", "TeamGrid"),
    createTemplateEntry(BusinessCnClosing, BusinessCnClosingSchema, BusinessCnClosingId, BusinessCnClosingName, BusinessCnClosingDesc, "business-cn", "Closing"),
];

export const techCnTemplates: TemplateWithData[] = [
    createTemplateEntry(TechCnCover, TechCnCoverSchema, TechCnCoverId, TechCnCoverName, TechCnCoverDesc, "tech-cn", "Cover"),
    createTemplateEntry(TechCnTableOfContents, TechCnTableOfContentsSchema, TechCnTableOfContentsId, TechCnTableOfContentsName, TechCnTableOfContentsDesc, "tech-cn", "TableOfContents"),
    createTemplateEntry(TechCnSectionDivider, TechCnSectionDividerSchema, TechCnSectionDividerId, TechCnSectionDividerName, TechCnSectionDividerDesc, "tech-cn", "SectionDivider"),
    createTemplateEntry(TechCnBigStatement, TechCnBigStatementSchema, TechCnBigStatementId, TechCnBigStatementName, TechCnBigStatementDesc, "tech-cn", "BigStatement"),
    createTemplateEntry(TechCnThreePoints, TechCnThreePointsSchema, TechCnThreePointsId, TechCnThreePointsName, TechCnThreePointsDesc, "tech-cn", "ThreePoints"),
    createTemplateEntry(TechCnFourFeatures, TechCnFourFeaturesSchema, TechCnFourFeaturesId, TechCnFourFeaturesName, TechCnFourFeaturesDesc, "tech-cn", "FourFeatures"),
    createTemplateEntry(TechCnIconList, TechCnIconListSchema, TechCnIconListId, TechCnIconListName, TechCnIconListDesc, "tech-cn", "IconList"),
    createTemplateEntry(TechCnKpiMetrics, TechCnKpiMetricsSchema, TechCnKpiMetricsId, TechCnKpiMetricsName, TechCnKpiMetricsDesc, "tech-cn", "KpiMetrics"),
    createTemplateEntry(TechCnComparison, TechCnComparisonSchema, TechCnComparisonId, TechCnComparisonName, TechCnComparisonDesc, "tech-cn", "Comparison"),
    createTemplateEntry(TechCnTimeline, TechCnTimelineSchema, TechCnTimelineId, TechCnTimelineName, TechCnTimelineDesc, "tech-cn", "Timeline"),
    createTemplateEntry(TechCnProcessSteps, TechCnProcessStepsSchema, TechCnProcessStepsId, TechCnProcessStepsName, TechCnProcessStepsDesc, "tech-cn", "ProcessSteps"),
    createTemplateEntry(TechCnRoadmap, TechCnRoadmapSchema, TechCnRoadmapId, TechCnRoadmapName, TechCnRoadmapDesc, "tech-cn", "Roadmap"),
    createTemplateEntry(TechCnBarChart, TechCnBarChartSchema, TechCnBarChartId, TechCnBarChartName, TechCnBarChartDesc, "tech-cn", "BarChart"),
    createTemplateEntry(TechCnPieDonut, TechCnPieDonutSchema, TechCnPieDonutId, TechCnPieDonutName, TechCnPieDonutDesc, "tech-cn", "PieDonut"),
    createTemplateEntry(TechCnLineChart, TechCnLineChartSchema, TechCnLineChartId, TechCnLineChartName, TechCnLineChartDesc, "tech-cn", "LineChart"),
    createTemplateEntry(TechCnDataTable, TechCnDataTableSchema, TechCnDataTableId, TechCnDataTableName, TechCnDataTableDesc, "tech-cn", "DataTable"),
    createTemplateEntry(TechCnImageLeft, TechCnImageLeftSchema, TechCnImageLeftId, TechCnImageLeftName, TechCnImageLeftDesc, "tech-cn", "ImageLeft"),
    createTemplateEntry(TechCnImageRight, TechCnImageRightSchema, TechCnImageRightId, TechCnImageRightName, TechCnImageRightDesc, "tech-cn", "ImageRight"),
    createTemplateEntry(TechCnFullBleedImage, TechCnFullBleedImageSchema, TechCnFullBleedImageId, TechCnFullBleedImageName, TechCnFullBleedImageDesc, "tech-cn", "FullBleedImage"),
    createTemplateEntry(TechCnQuote, TechCnQuoteSchema, TechCnQuoteId, TechCnQuoteName, TechCnQuoteDesc, "tech-cn", "Quote"),
    createTemplateEntry(TechCnTeamGrid, TechCnTeamGridSchema, TechCnTeamGridId, TechCnTeamGridName, TechCnTeamGridDesc, "tech-cn", "TeamGrid"),
    createTemplateEntry(TechCnClosing, TechCnClosingSchema, TechCnClosingId, TechCnClosingName, TechCnClosingDesc, "tech-cn", "Closing"),
];

export const medicalCnTemplates: TemplateWithData[] = [
    createTemplateEntry(MedicalCnCover, MedicalCnCoverSchema, MedicalCnCoverId, MedicalCnCoverName, MedicalCnCoverDesc, "medical-cn", "Cover"),
    createTemplateEntry(MedicalCnTableOfContents, MedicalCnTableOfContentsSchema, MedicalCnTableOfContentsId, MedicalCnTableOfContentsName, MedicalCnTableOfContentsDesc, "medical-cn", "TableOfContents"),
    createTemplateEntry(MedicalCnSectionDivider, MedicalCnSectionDividerSchema, MedicalCnSectionDividerId, MedicalCnSectionDividerName, MedicalCnSectionDividerDesc, "medical-cn", "SectionDivider"),
    createTemplateEntry(MedicalCnBigStatement, MedicalCnBigStatementSchema, MedicalCnBigStatementId, MedicalCnBigStatementName, MedicalCnBigStatementDesc, "medical-cn", "BigStatement"),
    createTemplateEntry(MedicalCnThreePoints, MedicalCnThreePointsSchema, MedicalCnThreePointsId, MedicalCnThreePointsName, MedicalCnThreePointsDesc, "medical-cn", "ThreePoints"),
    createTemplateEntry(MedicalCnFourFeatures, MedicalCnFourFeaturesSchema, MedicalCnFourFeaturesId, MedicalCnFourFeaturesName, MedicalCnFourFeaturesDesc, "medical-cn", "FourFeatures"),
    createTemplateEntry(MedicalCnIconList, MedicalCnIconListSchema, MedicalCnIconListId, MedicalCnIconListName, MedicalCnIconListDesc, "medical-cn", "IconList"),
    createTemplateEntry(MedicalCnKpiMetrics, MedicalCnKpiMetricsSchema, MedicalCnKpiMetricsId, MedicalCnKpiMetricsName, MedicalCnKpiMetricsDesc, "medical-cn", "KpiMetrics"),
    createTemplateEntry(MedicalCnComparison, MedicalCnComparisonSchema, MedicalCnComparisonId, MedicalCnComparisonName, MedicalCnComparisonDesc, "medical-cn", "Comparison"),
    createTemplateEntry(MedicalCnTimeline, MedicalCnTimelineSchema, MedicalCnTimelineId, MedicalCnTimelineName, MedicalCnTimelineDesc, "medical-cn", "Timeline"),
    createTemplateEntry(MedicalCnProcessSteps, MedicalCnProcessStepsSchema, MedicalCnProcessStepsId, MedicalCnProcessStepsName, MedicalCnProcessStepsDesc, "medical-cn", "ProcessSteps"),
    createTemplateEntry(MedicalCnRoadmap, MedicalCnRoadmapSchema, MedicalCnRoadmapId, MedicalCnRoadmapName, MedicalCnRoadmapDesc, "medical-cn", "Roadmap"),
    createTemplateEntry(MedicalCnBarChart, MedicalCnBarChartSchema, MedicalCnBarChartId, MedicalCnBarChartName, MedicalCnBarChartDesc, "medical-cn", "BarChart"),
    createTemplateEntry(MedicalCnPieDonut, MedicalCnPieDonutSchema, MedicalCnPieDonutId, MedicalCnPieDonutName, MedicalCnPieDonutDesc, "medical-cn", "PieDonut"),
    createTemplateEntry(MedicalCnLineChart, MedicalCnLineChartSchema, MedicalCnLineChartId, MedicalCnLineChartName, MedicalCnLineChartDesc, "medical-cn", "LineChart"),
    createTemplateEntry(MedicalCnDataTable, MedicalCnDataTableSchema, MedicalCnDataTableId, MedicalCnDataTableName, MedicalCnDataTableDesc, "medical-cn", "DataTable"),
    createTemplateEntry(MedicalCnImageLeft, MedicalCnImageLeftSchema, MedicalCnImageLeftId, MedicalCnImageLeftName, MedicalCnImageLeftDesc, "medical-cn", "ImageLeft"),
    createTemplateEntry(MedicalCnImageRight, MedicalCnImageRightSchema, MedicalCnImageRightId, MedicalCnImageRightName, MedicalCnImageRightDesc, "medical-cn", "ImageRight"),
    createTemplateEntry(MedicalCnFullBleedImage, MedicalCnFullBleedImageSchema, MedicalCnFullBleedImageId, MedicalCnFullBleedImageName, MedicalCnFullBleedImageDesc, "medical-cn", "FullBleedImage"),
    createTemplateEntry(MedicalCnQuote, MedicalCnQuoteSchema, MedicalCnQuoteId, MedicalCnQuoteName, MedicalCnQuoteDesc, "medical-cn", "Quote"),
    createTemplateEntry(MedicalCnTeamGrid, MedicalCnTeamGridSchema, MedicalCnTeamGridId, MedicalCnTeamGridName, MedicalCnTeamGridDesc, "medical-cn", "TeamGrid"),
    createTemplateEntry(MedicalCnClosing, MedicalCnClosingSchema, MedicalCnClosingId, MedicalCnClosingName, MedicalCnClosingDesc, "medical-cn", "Closing"),
];

export const educationCnTemplates: TemplateWithData[] = [
    createTemplateEntry(EducationCnCover, EducationCnCoverSchema, EducationCnCoverId, EducationCnCoverName, EducationCnCoverDesc, "education-cn", "Cover"),
    createTemplateEntry(EducationCnTableOfContents, EducationCnTableOfContentsSchema, EducationCnTableOfContentsId, EducationCnTableOfContentsName, EducationCnTableOfContentsDesc, "education-cn", "TableOfContents"),
    createTemplateEntry(EducationCnSectionDivider, EducationCnSectionDividerSchema, EducationCnSectionDividerId, EducationCnSectionDividerName, EducationCnSectionDividerDesc, "education-cn", "SectionDivider"),
    createTemplateEntry(EducationCnBigStatement, EducationCnBigStatementSchema, EducationCnBigStatementId, EducationCnBigStatementName, EducationCnBigStatementDesc, "education-cn", "BigStatement"),
    createTemplateEntry(EducationCnThreePoints, EducationCnThreePointsSchema, EducationCnThreePointsId, EducationCnThreePointsName, EducationCnThreePointsDesc, "education-cn", "ThreePoints"),
    createTemplateEntry(EducationCnFourFeatures, EducationCnFourFeaturesSchema, EducationCnFourFeaturesId, EducationCnFourFeaturesName, EducationCnFourFeaturesDesc, "education-cn", "FourFeatures"),
    createTemplateEntry(EducationCnIconList, EducationCnIconListSchema, EducationCnIconListId, EducationCnIconListName, EducationCnIconListDesc, "education-cn", "IconList"),
    createTemplateEntry(EducationCnKpiMetrics, EducationCnKpiMetricsSchema, EducationCnKpiMetricsId, EducationCnKpiMetricsName, EducationCnKpiMetricsDesc, "education-cn", "KpiMetrics"),
    createTemplateEntry(EducationCnComparison, EducationCnComparisonSchema, EducationCnComparisonId, EducationCnComparisonName, EducationCnComparisonDesc, "education-cn", "Comparison"),
    createTemplateEntry(EducationCnTimeline, EducationCnTimelineSchema, EducationCnTimelineId, EducationCnTimelineName, EducationCnTimelineDesc, "education-cn", "Timeline"),
    createTemplateEntry(EducationCnProcessSteps, EducationCnProcessStepsSchema, EducationCnProcessStepsId, EducationCnProcessStepsName, EducationCnProcessStepsDesc, "education-cn", "ProcessSteps"),
    createTemplateEntry(EducationCnRoadmap, EducationCnRoadmapSchema, EducationCnRoadmapId, EducationCnRoadmapName, EducationCnRoadmapDesc, "education-cn", "Roadmap"),
    createTemplateEntry(EducationCnBarChart, EducationCnBarChartSchema, EducationCnBarChartId, EducationCnBarChartName, EducationCnBarChartDesc, "education-cn", "BarChart"),
    createTemplateEntry(EducationCnPieDonut, EducationCnPieDonutSchema, EducationCnPieDonutId, EducationCnPieDonutName, EducationCnPieDonutDesc, "education-cn", "PieDonut"),
    createTemplateEntry(EducationCnLineChart, EducationCnLineChartSchema, EducationCnLineChartId, EducationCnLineChartName, EducationCnLineChartDesc, "education-cn", "LineChart"),
    createTemplateEntry(EducationCnDataTable, EducationCnDataTableSchema, EducationCnDataTableId, EducationCnDataTableName, EducationCnDataTableDesc, "education-cn", "DataTable"),
    createTemplateEntry(EducationCnImageLeft, EducationCnImageLeftSchema, EducationCnImageLeftId, EducationCnImageLeftName, EducationCnImageLeftDesc, "education-cn", "ImageLeft"),
    createTemplateEntry(EducationCnImageRight, EducationCnImageRightSchema, EducationCnImageRightId, EducationCnImageRightName, EducationCnImageRightDesc, "education-cn", "ImageRight"),
    createTemplateEntry(EducationCnFullBleedImage, EducationCnFullBleedImageSchema, EducationCnFullBleedImageId, EducationCnFullBleedImageName, EducationCnFullBleedImageDesc, "education-cn", "FullBleedImage"),
    createTemplateEntry(EducationCnQuote, EducationCnQuoteSchema, EducationCnQuoteId, EducationCnQuoteName, EducationCnQuoteDesc, "education-cn", "Quote"),
    createTemplateEntry(EducationCnTeamGrid, EducationCnTeamGridSchema, EducationCnTeamGridId, EducationCnTeamGridName, EducationCnTeamGridDesc, "education-cn", "TeamGrid"),
    createTemplateEntry(EducationCnClosing, EducationCnClosingSchema, EducationCnClosingId, EducationCnClosingName, EducationCnClosingDesc, "education-cn", "Closing"),
];

export const foodCnTemplates: TemplateWithData[] = [
    createTemplateEntry(FoodCnCover, FoodCnCoverSchema, FoodCnCoverId, FoodCnCoverName, FoodCnCoverDesc, "food-cn", "Cover"),
    createTemplateEntry(FoodCnTableOfContents, FoodCnTableOfContentsSchema, FoodCnTableOfContentsId, FoodCnTableOfContentsName, FoodCnTableOfContentsDesc, "food-cn", "TableOfContents"),
    createTemplateEntry(FoodCnSectionDivider, FoodCnSectionDividerSchema, FoodCnSectionDividerId, FoodCnSectionDividerName, FoodCnSectionDividerDesc, "food-cn", "SectionDivider"),
    createTemplateEntry(FoodCnBigStatement, FoodCnBigStatementSchema, FoodCnBigStatementId, FoodCnBigStatementName, FoodCnBigStatementDesc, "food-cn", "BigStatement"),
    createTemplateEntry(FoodCnThreePoints, FoodCnThreePointsSchema, FoodCnThreePointsId, FoodCnThreePointsName, FoodCnThreePointsDesc, "food-cn", "ThreePoints"),
    createTemplateEntry(FoodCnFourFeatures, FoodCnFourFeaturesSchema, FoodCnFourFeaturesId, FoodCnFourFeaturesName, FoodCnFourFeaturesDesc, "food-cn", "FourFeatures"),
    createTemplateEntry(FoodCnIconList, FoodCnIconListSchema, FoodCnIconListId, FoodCnIconListName, FoodCnIconListDesc, "food-cn", "IconList"),
    createTemplateEntry(FoodCnKpiMetrics, FoodCnKpiMetricsSchema, FoodCnKpiMetricsId, FoodCnKpiMetricsName, FoodCnKpiMetricsDesc, "food-cn", "KpiMetrics"),
    createTemplateEntry(FoodCnComparison, FoodCnComparisonSchema, FoodCnComparisonId, FoodCnComparisonName, FoodCnComparisonDesc, "food-cn", "Comparison"),
    createTemplateEntry(FoodCnTimeline, FoodCnTimelineSchema, FoodCnTimelineId, FoodCnTimelineName, FoodCnTimelineDesc, "food-cn", "Timeline"),
    createTemplateEntry(FoodCnProcessSteps, FoodCnProcessStepsSchema, FoodCnProcessStepsId, FoodCnProcessStepsName, FoodCnProcessStepsDesc, "food-cn", "ProcessSteps"),
    createTemplateEntry(FoodCnRoadmap, FoodCnRoadmapSchema, FoodCnRoadmapId, FoodCnRoadmapName, FoodCnRoadmapDesc, "food-cn", "Roadmap"),
    createTemplateEntry(FoodCnBarChart, FoodCnBarChartSchema, FoodCnBarChartId, FoodCnBarChartName, FoodCnBarChartDesc, "food-cn", "BarChart"),
    createTemplateEntry(FoodCnPieDonut, FoodCnPieDonutSchema, FoodCnPieDonutId, FoodCnPieDonutName, FoodCnPieDonutDesc, "food-cn", "PieDonut"),
    createTemplateEntry(FoodCnLineChart, FoodCnLineChartSchema, FoodCnLineChartId, FoodCnLineChartName, FoodCnLineChartDesc, "food-cn", "LineChart"),
    createTemplateEntry(FoodCnDataTable, FoodCnDataTableSchema, FoodCnDataTableId, FoodCnDataTableName, FoodCnDataTableDesc, "food-cn", "DataTable"),
    createTemplateEntry(FoodCnImageLeft, FoodCnImageLeftSchema, FoodCnImageLeftId, FoodCnImageLeftName, FoodCnImageLeftDesc, "food-cn", "ImageLeft"),
    createTemplateEntry(FoodCnImageRight, FoodCnImageRightSchema, FoodCnImageRightId, FoodCnImageRightName, FoodCnImageRightDesc, "food-cn", "ImageRight"),
    createTemplateEntry(FoodCnFullBleedImage, FoodCnFullBleedImageSchema, FoodCnFullBleedImageId, FoodCnFullBleedImageName, FoodCnFullBleedImageDesc, "food-cn", "FullBleedImage"),
    createTemplateEntry(FoodCnQuote, FoodCnQuoteSchema, FoodCnQuoteId, FoodCnQuoteName, FoodCnQuoteDesc, "food-cn", "Quote"),
    createTemplateEntry(FoodCnTeamGrid, FoodCnTeamGridSchema, FoodCnTeamGridId, FoodCnTeamGridName, FoodCnTeamGridDesc, "food-cn", "TeamGrid"),
    createTemplateEntry(FoodCnClosing, FoodCnClosingSchema, FoodCnClosingId, FoodCnClosingName, FoodCnClosingDesc, "food-cn", "Closing"),
];

export const financeCnTemplates: TemplateWithData[] = [
    createTemplateEntry(FinanceCnCover, FinanceCnCoverSchema, FinanceCnCoverId, FinanceCnCoverName, FinanceCnCoverDesc, "finance-cn", "Cover"),
    createTemplateEntry(FinanceCnTableOfContents, FinanceCnTableOfContentsSchema, FinanceCnTableOfContentsId, FinanceCnTableOfContentsName, FinanceCnTableOfContentsDesc, "finance-cn", "TableOfContents"),
    createTemplateEntry(FinanceCnSectionDivider, FinanceCnSectionDividerSchema, FinanceCnSectionDividerId, FinanceCnSectionDividerName, FinanceCnSectionDividerDesc, "finance-cn", "SectionDivider"),
    createTemplateEntry(FinanceCnBigStatement, FinanceCnBigStatementSchema, FinanceCnBigStatementId, FinanceCnBigStatementName, FinanceCnBigStatementDesc, "finance-cn", "BigStatement"),
    createTemplateEntry(FinanceCnThreePoints, FinanceCnThreePointsSchema, FinanceCnThreePointsId, FinanceCnThreePointsName, FinanceCnThreePointsDesc, "finance-cn", "ThreePoints"),
    createTemplateEntry(FinanceCnFourFeatures, FinanceCnFourFeaturesSchema, FinanceCnFourFeaturesId, FinanceCnFourFeaturesName, FinanceCnFourFeaturesDesc, "finance-cn", "FourFeatures"),
    createTemplateEntry(FinanceCnIconList, FinanceCnIconListSchema, FinanceCnIconListId, FinanceCnIconListName, FinanceCnIconListDesc, "finance-cn", "IconList"),
    createTemplateEntry(FinanceCnKpiMetrics, FinanceCnKpiMetricsSchema, FinanceCnKpiMetricsId, FinanceCnKpiMetricsName, FinanceCnKpiMetricsDesc, "finance-cn", "KpiMetrics"),
    createTemplateEntry(FinanceCnComparison, FinanceCnComparisonSchema, FinanceCnComparisonId, FinanceCnComparisonName, FinanceCnComparisonDesc, "finance-cn", "Comparison"),
    createTemplateEntry(FinanceCnTimeline, FinanceCnTimelineSchema, FinanceCnTimelineId, FinanceCnTimelineName, FinanceCnTimelineDesc, "finance-cn", "Timeline"),
    createTemplateEntry(FinanceCnProcessSteps, FinanceCnProcessStepsSchema, FinanceCnProcessStepsId, FinanceCnProcessStepsName, FinanceCnProcessStepsDesc, "finance-cn", "ProcessSteps"),
    createTemplateEntry(FinanceCnRoadmap, FinanceCnRoadmapSchema, FinanceCnRoadmapId, FinanceCnRoadmapName, FinanceCnRoadmapDesc, "finance-cn", "Roadmap"),
    createTemplateEntry(FinanceCnBarChart, FinanceCnBarChartSchema, FinanceCnBarChartId, FinanceCnBarChartName, FinanceCnBarChartDesc, "finance-cn", "BarChart"),
    createTemplateEntry(FinanceCnPieDonut, FinanceCnPieDonutSchema, FinanceCnPieDonutId, FinanceCnPieDonutName, FinanceCnPieDonutDesc, "finance-cn", "PieDonut"),
    createTemplateEntry(FinanceCnLineChart, FinanceCnLineChartSchema, FinanceCnLineChartId, FinanceCnLineChartName, FinanceCnLineChartDesc, "finance-cn", "LineChart"),
    createTemplateEntry(FinanceCnDataTable, FinanceCnDataTableSchema, FinanceCnDataTableId, FinanceCnDataTableName, FinanceCnDataTableDesc, "finance-cn", "DataTable"),
    createTemplateEntry(FinanceCnImageLeft, FinanceCnImageLeftSchema, FinanceCnImageLeftId, FinanceCnImageLeftName, FinanceCnImageLeftDesc, "finance-cn", "ImageLeft"),
    createTemplateEntry(FinanceCnImageRight, FinanceCnImageRightSchema, FinanceCnImageRightId, FinanceCnImageRightName, FinanceCnImageRightDesc, "finance-cn", "ImageRight"),
    createTemplateEntry(FinanceCnFullBleedImage, FinanceCnFullBleedImageSchema, FinanceCnFullBleedImageId, FinanceCnFullBleedImageName, FinanceCnFullBleedImageDesc, "finance-cn", "FullBleedImage"),
    createTemplateEntry(FinanceCnQuote, FinanceCnQuoteSchema, FinanceCnQuoteId, FinanceCnQuoteName, FinanceCnQuoteDesc, "finance-cn", "Quote"),
    createTemplateEntry(FinanceCnTeamGrid, FinanceCnTeamGridSchema, FinanceCnTeamGridId, FinanceCnTeamGridName, FinanceCnTeamGridDesc, "finance-cn", "TeamGrid"),
    createTemplateEntry(FinanceCnClosing, FinanceCnClosingSchema, FinanceCnClosingId, FinanceCnClosingName, FinanceCnClosingDesc, "finance-cn", "Closing"),
];

export const govCnTemplates: TemplateWithData[] = [
    createTemplateEntry(GovCnCover, GovCnCoverSchema, GovCnCoverId, GovCnCoverName, GovCnCoverDesc, "gov-cn", "Cover"),
    createTemplateEntry(GovCnTableOfContents, GovCnTableOfContentsSchema, GovCnTableOfContentsId, GovCnTableOfContentsName, GovCnTableOfContentsDesc, "gov-cn", "TableOfContents"),
    createTemplateEntry(GovCnSectionDivider, GovCnSectionDividerSchema, GovCnSectionDividerId, GovCnSectionDividerName, GovCnSectionDividerDesc, "gov-cn", "SectionDivider"),
    createTemplateEntry(GovCnBigStatement, GovCnBigStatementSchema, GovCnBigStatementId, GovCnBigStatementName, GovCnBigStatementDesc, "gov-cn", "BigStatement"),
    createTemplateEntry(GovCnThreePoints, GovCnThreePointsSchema, GovCnThreePointsId, GovCnThreePointsName, GovCnThreePointsDesc, "gov-cn", "ThreePoints"),
    createTemplateEntry(GovCnFourFeatures, GovCnFourFeaturesSchema, GovCnFourFeaturesId, GovCnFourFeaturesName, GovCnFourFeaturesDesc, "gov-cn", "FourFeatures"),
    createTemplateEntry(GovCnIconList, GovCnIconListSchema, GovCnIconListId, GovCnIconListName, GovCnIconListDesc, "gov-cn", "IconList"),
    createTemplateEntry(GovCnKpiMetrics, GovCnKpiMetricsSchema, GovCnKpiMetricsId, GovCnKpiMetricsName, GovCnKpiMetricsDesc, "gov-cn", "KpiMetrics"),
    createTemplateEntry(GovCnComparison, GovCnComparisonSchema, GovCnComparisonId, GovCnComparisonName, GovCnComparisonDesc, "gov-cn", "Comparison"),
    createTemplateEntry(GovCnTimeline, GovCnTimelineSchema, GovCnTimelineId, GovCnTimelineName, GovCnTimelineDesc, "gov-cn", "Timeline"),
    createTemplateEntry(GovCnProcessSteps, GovCnProcessStepsSchema, GovCnProcessStepsId, GovCnProcessStepsName, GovCnProcessStepsDesc, "gov-cn", "ProcessSteps"),
    createTemplateEntry(GovCnRoadmap, GovCnRoadmapSchema, GovCnRoadmapId, GovCnRoadmapName, GovCnRoadmapDesc, "gov-cn", "Roadmap"),
    createTemplateEntry(GovCnBarChart, GovCnBarChartSchema, GovCnBarChartId, GovCnBarChartName, GovCnBarChartDesc, "gov-cn", "BarChart"),
    createTemplateEntry(GovCnPieDonut, GovCnPieDonutSchema, GovCnPieDonutId, GovCnPieDonutName, GovCnPieDonutDesc, "gov-cn", "PieDonut"),
    createTemplateEntry(GovCnLineChart, GovCnLineChartSchema, GovCnLineChartId, GovCnLineChartName, GovCnLineChartDesc, "gov-cn", "LineChart"),
    createTemplateEntry(GovCnDataTable, GovCnDataTableSchema, GovCnDataTableId, GovCnDataTableName, GovCnDataTableDesc, "gov-cn", "DataTable"),
    createTemplateEntry(GovCnImageLeft, GovCnImageLeftSchema, GovCnImageLeftId, GovCnImageLeftName, GovCnImageLeftDesc, "gov-cn", "ImageLeft"),
    createTemplateEntry(GovCnImageRight, GovCnImageRightSchema, GovCnImageRightId, GovCnImageRightName, GovCnImageRightDesc, "gov-cn", "ImageRight"),
    createTemplateEntry(GovCnFullBleedImage, GovCnFullBleedImageSchema, GovCnFullBleedImageId, GovCnFullBleedImageName, GovCnFullBleedImageDesc, "gov-cn", "FullBleedImage"),
    createTemplateEntry(GovCnQuote, GovCnQuoteSchema, GovCnQuoteId, GovCnQuoteName, GovCnQuoteDesc, "gov-cn", "Quote"),
    createTemplateEntry(GovCnTeamGrid, GovCnTeamGridSchema, GovCnTeamGridId, GovCnTeamGridName, GovCnTeamGridDesc, "gov-cn", "TeamGrid"),
    createTemplateEntry(GovCnClosing, GovCnClosingSchema, GovCnClosingId, GovCnClosingName, GovCnClosingDesc, "gov-cn", "Closing"),
];

export const realestateCnTemplates: TemplateWithData[] = [
    createTemplateEntry(RealestateCnCover, RealestateCnCoverSchema, RealestateCnCoverId, RealestateCnCoverName, RealestateCnCoverDesc, "realestate-cn", "Cover"),
    createTemplateEntry(RealestateCnTableOfContents, RealestateCnTableOfContentsSchema, RealestateCnTableOfContentsId, RealestateCnTableOfContentsName, RealestateCnTableOfContentsDesc, "realestate-cn", "TableOfContents"),
    createTemplateEntry(RealestateCnSectionDivider, RealestateCnSectionDividerSchema, RealestateCnSectionDividerId, RealestateCnSectionDividerName, RealestateCnSectionDividerDesc, "realestate-cn", "SectionDivider"),
    createTemplateEntry(RealestateCnBigStatement, RealestateCnBigStatementSchema, RealestateCnBigStatementId, RealestateCnBigStatementName, RealestateCnBigStatementDesc, "realestate-cn", "BigStatement"),
    createTemplateEntry(RealestateCnThreePoints, RealestateCnThreePointsSchema, RealestateCnThreePointsId, RealestateCnThreePointsName, RealestateCnThreePointsDesc, "realestate-cn", "ThreePoints"),
    createTemplateEntry(RealestateCnFourFeatures, RealestateCnFourFeaturesSchema, RealestateCnFourFeaturesId, RealestateCnFourFeaturesName, RealestateCnFourFeaturesDesc, "realestate-cn", "FourFeatures"),
    createTemplateEntry(RealestateCnIconList, RealestateCnIconListSchema, RealestateCnIconListId, RealestateCnIconListName, RealestateCnIconListDesc, "realestate-cn", "IconList"),
    createTemplateEntry(RealestateCnKpiMetrics, RealestateCnKpiMetricsSchema, RealestateCnKpiMetricsId, RealestateCnKpiMetricsName, RealestateCnKpiMetricsDesc, "realestate-cn", "KpiMetrics"),
    createTemplateEntry(RealestateCnComparison, RealestateCnComparisonSchema, RealestateCnComparisonId, RealestateCnComparisonName, RealestateCnComparisonDesc, "realestate-cn", "Comparison"),
    createTemplateEntry(RealestateCnTimeline, RealestateCnTimelineSchema, RealestateCnTimelineId, RealestateCnTimelineName, RealestateCnTimelineDesc, "realestate-cn", "Timeline"),
    createTemplateEntry(RealestateCnProcessSteps, RealestateCnProcessStepsSchema, RealestateCnProcessStepsId, RealestateCnProcessStepsName, RealestateCnProcessStepsDesc, "realestate-cn", "ProcessSteps"),
    createTemplateEntry(RealestateCnRoadmap, RealestateCnRoadmapSchema, RealestateCnRoadmapId, RealestateCnRoadmapName, RealestateCnRoadmapDesc, "realestate-cn", "Roadmap"),
    createTemplateEntry(RealestateCnBarChart, RealestateCnBarChartSchema, RealestateCnBarChartId, RealestateCnBarChartName, RealestateCnBarChartDesc, "realestate-cn", "BarChart"),
    createTemplateEntry(RealestateCnPieDonut, RealestateCnPieDonutSchema, RealestateCnPieDonutId, RealestateCnPieDonutName, RealestateCnPieDonutDesc, "realestate-cn", "PieDonut"),
    createTemplateEntry(RealestateCnLineChart, RealestateCnLineChartSchema, RealestateCnLineChartId, RealestateCnLineChartName, RealestateCnLineChartDesc, "realestate-cn", "LineChart"),
    createTemplateEntry(RealestateCnDataTable, RealestateCnDataTableSchema, RealestateCnDataTableId, RealestateCnDataTableName, RealestateCnDataTableDesc, "realestate-cn", "DataTable"),
    createTemplateEntry(RealestateCnImageLeft, RealestateCnImageLeftSchema, RealestateCnImageLeftId, RealestateCnImageLeftName, RealestateCnImageLeftDesc, "realestate-cn", "ImageLeft"),
    createTemplateEntry(RealestateCnImageRight, RealestateCnImageRightSchema, RealestateCnImageRightId, RealestateCnImageRightName, RealestateCnImageRightDesc, "realestate-cn", "ImageRight"),
    createTemplateEntry(RealestateCnFullBleedImage, RealestateCnFullBleedImageSchema, RealestateCnFullBleedImageId, RealestateCnFullBleedImageName, RealestateCnFullBleedImageDesc, "realestate-cn", "FullBleedImage"),
    createTemplateEntry(RealestateCnQuote, RealestateCnQuoteSchema, RealestateCnQuoteId, RealestateCnQuoteName, RealestateCnQuoteDesc, "realestate-cn", "Quote"),
    createTemplateEntry(RealestateCnTeamGrid, RealestateCnTeamGridSchema, RealestateCnTeamGridId, RealestateCnTeamGridName, RealestateCnTeamGridDesc, "realestate-cn", "TeamGrid"),
    createTemplateEntry(RealestateCnClosing, RealestateCnClosingSchema, RealestateCnClosingId, RealestateCnClosingName, RealestateCnClosingDesc, "realestate-cn", "Closing"),
];

export const cultureCnTemplates: TemplateWithData[] = [
    createTemplateEntry(CultureCnCover, CultureCnCoverSchema, CultureCnCoverId, CultureCnCoverName, CultureCnCoverDesc, "culture-cn", "Cover"),
    createTemplateEntry(CultureCnTableOfContents, CultureCnTableOfContentsSchema, CultureCnTableOfContentsId, CultureCnTableOfContentsName, CultureCnTableOfContentsDesc, "culture-cn", "TableOfContents"),
    createTemplateEntry(CultureCnSectionDivider, CultureCnSectionDividerSchema, CultureCnSectionDividerId, CultureCnSectionDividerName, CultureCnSectionDividerDesc, "culture-cn", "SectionDivider"),
    createTemplateEntry(CultureCnBigStatement, CultureCnBigStatementSchema, CultureCnBigStatementId, CultureCnBigStatementName, CultureCnBigStatementDesc, "culture-cn", "BigStatement"),
    createTemplateEntry(CultureCnThreePoints, CultureCnThreePointsSchema, CultureCnThreePointsId, CultureCnThreePointsName, CultureCnThreePointsDesc, "culture-cn", "ThreePoints"),
    createTemplateEntry(CultureCnFourFeatures, CultureCnFourFeaturesSchema, CultureCnFourFeaturesId, CultureCnFourFeaturesName, CultureCnFourFeaturesDesc, "culture-cn", "FourFeatures"),
    createTemplateEntry(CultureCnIconList, CultureCnIconListSchema, CultureCnIconListId, CultureCnIconListName, CultureCnIconListDesc, "culture-cn", "IconList"),
    createTemplateEntry(CultureCnKpiMetrics, CultureCnKpiMetricsSchema, CultureCnKpiMetricsId, CultureCnKpiMetricsName, CultureCnKpiMetricsDesc, "culture-cn", "KpiMetrics"),
    createTemplateEntry(CultureCnComparison, CultureCnComparisonSchema, CultureCnComparisonId, CultureCnComparisonName, CultureCnComparisonDesc, "culture-cn", "Comparison"),
    createTemplateEntry(CultureCnTimeline, CultureCnTimelineSchema, CultureCnTimelineId, CultureCnTimelineName, CultureCnTimelineDesc, "culture-cn", "Timeline"),
    createTemplateEntry(CultureCnProcessSteps, CultureCnProcessStepsSchema, CultureCnProcessStepsId, CultureCnProcessStepsName, CultureCnProcessStepsDesc, "culture-cn", "ProcessSteps"),
    createTemplateEntry(CultureCnRoadmap, CultureCnRoadmapSchema, CultureCnRoadmapId, CultureCnRoadmapName, CultureCnRoadmapDesc, "culture-cn", "Roadmap"),
    createTemplateEntry(CultureCnBarChart, CultureCnBarChartSchema, CultureCnBarChartId, CultureCnBarChartName, CultureCnBarChartDesc, "culture-cn", "BarChart"),
    createTemplateEntry(CultureCnPieDonut, CultureCnPieDonutSchema, CultureCnPieDonutId, CultureCnPieDonutName, CultureCnPieDonutDesc, "culture-cn", "PieDonut"),
    createTemplateEntry(CultureCnLineChart, CultureCnLineChartSchema, CultureCnLineChartId, CultureCnLineChartName, CultureCnLineChartDesc, "culture-cn", "LineChart"),
    createTemplateEntry(CultureCnDataTable, CultureCnDataTableSchema, CultureCnDataTableId, CultureCnDataTableName, CultureCnDataTableDesc, "culture-cn", "DataTable"),
    createTemplateEntry(CultureCnImageLeft, CultureCnImageLeftSchema, CultureCnImageLeftId, CultureCnImageLeftName, CultureCnImageLeftDesc, "culture-cn", "ImageLeft"),
    createTemplateEntry(CultureCnImageRight, CultureCnImageRightSchema, CultureCnImageRightId, CultureCnImageRightName, CultureCnImageRightDesc, "culture-cn", "ImageRight"),
    createTemplateEntry(CultureCnFullBleedImage, CultureCnFullBleedImageSchema, CultureCnFullBleedImageId, CultureCnFullBleedImageName, CultureCnFullBleedImageDesc, "culture-cn", "FullBleedImage"),
    createTemplateEntry(CultureCnQuote, CultureCnQuoteSchema, CultureCnQuoteId, CultureCnQuoteName, CultureCnQuoteDesc, "culture-cn", "Quote"),
    createTemplateEntry(CultureCnTeamGrid, CultureCnTeamGridSchema, CultureCnTeamGridId, CultureCnTeamGridName, CultureCnTeamGridDesc, "culture-cn", "TeamGrid"),
    createTemplateEntry(CultureCnClosing, CultureCnClosingSchema, CultureCnClosingId, CultureCnClosingName, CultureCnClosingDesc, "culture-cn", "Closing"),
];

export const greenCnTemplates: TemplateWithData[] = [
    createTemplateEntry(GreenCnCover, GreenCnCoverSchema, GreenCnCoverId, GreenCnCoverName, GreenCnCoverDesc, "green-cn", "Cover"),
    createTemplateEntry(GreenCnTableOfContents, GreenCnTableOfContentsSchema, GreenCnTableOfContentsId, GreenCnTableOfContentsName, GreenCnTableOfContentsDesc, "green-cn", "TableOfContents"),
    createTemplateEntry(GreenCnSectionDivider, GreenCnSectionDividerSchema, GreenCnSectionDividerId, GreenCnSectionDividerName, GreenCnSectionDividerDesc, "green-cn", "SectionDivider"),
    createTemplateEntry(GreenCnBigStatement, GreenCnBigStatementSchema, GreenCnBigStatementId, GreenCnBigStatementName, GreenCnBigStatementDesc, "green-cn", "BigStatement"),
    createTemplateEntry(GreenCnThreePoints, GreenCnThreePointsSchema, GreenCnThreePointsId, GreenCnThreePointsName, GreenCnThreePointsDesc, "green-cn", "ThreePoints"),
    createTemplateEntry(GreenCnFourFeatures, GreenCnFourFeaturesSchema, GreenCnFourFeaturesId, GreenCnFourFeaturesName, GreenCnFourFeaturesDesc, "green-cn", "FourFeatures"),
    createTemplateEntry(GreenCnIconList, GreenCnIconListSchema, GreenCnIconListId, GreenCnIconListName, GreenCnIconListDesc, "green-cn", "IconList"),
    createTemplateEntry(GreenCnKpiMetrics, GreenCnKpiMetricsSchema, GreenCnKpiMetricsId, GreenCnKpiMetricsName, GreenCnKpiMetricsDesc, "green-cn", "KpiMetrics"),
    createTemplateEntry(GreenCnComparison, GreenCnComparisonSchema, GreenCnComparisonId, GreenCnComparisonName, GreenCnComparisonDesc, "green-cn", "Comparison"),
    createTemplateEntry(GreenCnTimeline, GreenCnTimelineSchema, GreenCnTimelineId, GreenCnTimelineName, GreenCnTimelineDesc, "green-cn", "Timeline"),
    createTemplateEntry(GreenCnProcessSteps, GreenCnProcessStepsSchema, GreenCnProcessStepsId, GreenCnProcessStepsName, GreenCnProcessStepsDesc, "green-cn", "ProcessSteps"),
    createTemplateEntry(GreenCnRoadmap, GreenCnRoadmapSchema, GreenCnRoadmapId, GreenCnRoadmapName, GreenCnRoadmapDesc, "green-cn", "Roadmap"),
    createTemplateEntry(GreenCnBarChart, GreenCnBarChartSchema, GreenCnBarChartId, GreenCnBarChartName, GreenCnBarChartDesc, "green-cn", "BarChart"),
    createTemplateEntry(GreenCnPieDonut, GreenCnPieDonutSchema, GreenCnPieDonutId, GreenCnPieDonutName, GreenCnPieDonutDesc, "green-cn", "PieDonut"),
    createTemplateEntry(GreenCnLineChart, GreenCnLineChartSchema, GreenCnLineChartId, GreenCnLineChartName, GreenCnLineChartDesc, "green-cn", "LineChart"),
    createTemplateEntry(GreenCnDataTable, GreenCnDataTableSchema, GreenCnDataTableId, GreenCnDataTableName, GreenCnDataTableDesc, "green-cn", "DataTable"),
    createTemplateEntry(GreenCnImageLeft, GreenCnImageLeftSchema, GreenCnImageLeftId, GreenCnImageLeftName, GreenCnImageLeftDesc, "green-cn", "ImageLeft"),
    createTemplateEntry(GreenCnImageRight, GreenCnImageRightSchema, GreenCnImageRightId, GreenCnImageRightName, GreenCnImageRightDesc, "green-cn", "ImageRight"),
    createTemplateEntry(GreenCnFullBleedImage, GreenCnFullBleedImageSchema, GreenCnFullBleedImageId, GreenCnFullBleedImageName, GreenCnFullBleedImageDesc, "green-cn", "FullBleedImage"),
    createTemplateEntry(GreenCnQuote, GreenCnQuoteSchema, GreenCnQuoteId, GreenCnQuoteName, GreenCnQuoteDesc, "green-cn", "Quote"),
    createTemplateEntry(GreenCnTeamGrid, GreenCnTeamGridSchema, GreenCnTeamGridId, GreenCnTeamGridName, GreenCnTeamGridDesc, "green-cn", "TeamGrid"),
    createTemplateEntry(GreenCnClosing, GreenCnClosingSchema, GreenCnClosingId, GreenCnClosingName, GreenCnClosingDesc, "green-cn", "Closing"),
];

export const retailCnTemplates: TemplateWithData[] = [
    createTemplateEntry(RetailCnCover, RetailCnCoverSchema, RetailCnCoverId, RetailCnCoverName, RetailCnCoverDesc, "retail-cn", "Cover"),
    createTemplateEntry(RetailCnTableOfContents, RetailCnTableOfContentsSchema, RetailCnTableOfContentsId, RetailCnTableOfContentsName, RetailCnTableOfContentsDesc, "retail-cn", "TableOfContents"),
    createTemplateEntry(RetailCnSectionDivider, RetailCnSectionDividerSchema, RetailCnSectionDividerId, RetailCnSectionDividerName, RetailCnSectionDividerDesc, "retail-cn", "SectionDivider"),
    createTemplateEntry(RetailCnBigStatement, RetailCnBigStatementSchema, RetailCnBigStatementId, RetailCnBigStatementName, RetailCnBigStatementDesc, "retail-cn", "BigStatement"),
    createTemplateEntry(RetailCnThreePoints, RetailCnThreePointsSchema, RetailCnThreePointsId, RetailCnThreePointsName, RetailCnThreePointsDesc, "retail-cn", "ThreePoints"),
    createTemplateEntry(RetailCnFourFeatures, RetailCnFourFeaturesSchema, RetailCnFourFeaturesId, RetailCnFourFeaturesName, RetailCnFourFeaturesDesc, "retail-cn", "FourFeatures"),
    createTemplateEntry(RetailCnIconList, RetailCnIconListSchema, RetailCnIconListId, RetailCnIconListName, RetailCnIconListDesc, "retail-cn", "IconList"),
    createTemplateEntry(RetailCnKpiMetrics, RetailCnKpiMetricsSchema, RetailCnKpiMetricsId, RetailCnKpiMetricsName, RetailCnKpiMetricsDesc, "retail-cn", "KpiMetrics"),
    createTemplateEntry(RetailCnComparison, RetailCnComparisonSchema, RetailCnComparisonId, RetailCnComparisonName, RetailCnComparisonDesc, "retail-cn", "Comparison"),
    createTemplateEntry(RetailCnTimeline, RetailCnTimelineSchema, RetailCnTimelineId, RetailCnTimelineName, RetailCnTimelineDesc, "retail-cn", "Timeline"),
    createTemplateEntry(RetailCnProcessSteps, RetailCnProcessStepsSchema, RetailCnProcessStepsId, RetailCnProcessStepsName, RetailCnProcessStepsDesc, "retail-cn", "ProcessSteps"),
    createTemplateEntry(RetailCnRoadmap, RetailCnRoadmapSchema, RetailCnRoadmapId, RetailCnRoadmapName, RetailCnRoadmapDesc, "retail-cn", "Roadmap"),
    createTemplateEntry(RetailCnBarChart, RetailCnBarChartSchema, RetailCnBarChartId, RetailCnBarChartName, RetailCnBarChartDesc, "retail-cn", "BarChart"),
    createTemplateEntry(RetailCnPieDonut, RetailCnPieDonutSchema, RetailCnPieDonutId, RetailCnPieDonutName, RetailCnPieDonutDesc, "retail-cn", "PieDonut"),
    createTemplateEntry(RetailCnLineChart, RetailCnLineChartSchema, RetailCnLineChartId, RetailCnLineChartName, RetailCnLineChartDesc, "retail-cn", "LineChart"),
    createTemplateEntry(RetailCnDataTable, RetailCnDataTableSchema, RetailCnDataTableId, RetailCnDataTableName, RetailCnDataTableDesc, "retail-cn", "DataTable"),
    createTemplateEntry(RetailCnImageLeft, RetailCnImageLeftSchema, RetailCnImageLeftId, RetailCnImageLeftName, RetailCnImageLeftDesc, "retail-cn", "ImageLeft"),
    createTemplateEntry(RetailCnImageRight, RetailCnImageRightSchema, RetailCnImageRightId, RetailCnImageRightName, RetailCnImageRightDesc, "retail-cn", "ImageRight"),
    createTemplateEntry(RetailCnFullBleedImage, RetailCnFullBleedImageSchema, RetailCnFullBleedImageId, RetailCnFullBleedImageName, RetailCnFullBleedImageDesc, "retail-cn", "FullBleedImage"),
    createTemplateEntry(RetailCnQuote, RetailCnQuoteSchema, RetailCnQuoteId, RetailCnQuoteName, RetailCnQuoteDesc, "retail-cn", "Quote"),
    createTemplateEntry(RetailCnTeamGrid, RetailCnTeamGridSchema, RetailCnTeamGridId, RetailCnTeamGridName, RetailCnTeamGridDesc, "retail-cn", "TeamGrid"),
    createTemplateEntry(RetailCnClosing, RetailCnClosingSchema, RetailCnClosingId, RetailCnClosingName, RetailCnClosingDesc, "retail-cn", "Closing"),
];

export const travelCnTemplates: TemplateWithData[] = [
    createTemplateEntry(TravelCnCover, TravelCnCoverSchema, TravelCnCoverId, TravelCnCoverName, TravelCnCoverDesc, "travel-cn", "Cover"),
    createTemplateEntry(TravelCnTableOfContents, TravelCnTableOfContentsSchema, TravelCnTableOfContentsId, TravelCnTableOfContentsName, TravelCnTableOfContentsDesc, "travel-cn", "TableOfContents"),
    createTemplateEntry(TravelCnSectionDivider, TravelCnSectionDividerSchema, TravelCnSectionDividerId, TravelCnSectionDividerName, TravelCnSectionDividerDesc, "travel-cn", "SectionDivider"),
    createTemplateEntry(TravelCnBigStatement, TravelCnBigStatementSchema, TravelCnBigStatementId, TravelCnBigStatementName, TravelCnBigStatementDesc, "travel-cn", "BigStatement"),
    createTemplateEntry(TravelCnThreePoints, TravelCnThreePointsSchema, TravelCnThreePointsId, TravelCnThreePointsName, TravelCnThreePointsDesc, "travel-cn", "ThreePoints"),
    createTemplateEntry(TravelCnFourFeatures, TravelCnFourFeaturesSchema, TravelCnFourFeaturesId, TravelCnFourFeaturesName, TravelCnFourFeaturesDesc, "travel-cn", "FourFeatures"),
    createTemplateEntry(TravelCnIconList, TravelCnIconListSchema, TravelCnIconListId, TravelCnIconListName, TravelCnIconListDesc, "travel-cn", "IconList"),
    createTemplateEntry(TravelCnKpiMetrics, TravelCnKpiMetricsSchema, TravelCnKpiMetricsId, TravelCnKpiMetricsName, TravelCnKpiMetricsDesc, "travel-cn", "KpiMetrics"),
    createTemplateEntry(TravelCnComparison, TravelCnComparisonSchema, TravelCnComparisonId, TravelCnComparisonName, TravelCnComparisonDesc, "travel-cn", "Comparison"),
    createTemplateEntry(TravelCnTimeline, TravelCnTimelineSchema, TravelCnTimelineId, TravelCnTimelineName, TravelCnTimelineDesc, "travel-cn", "Timeline"),
    createTemplateEntry(TravelCnProcessSteps, TravelCnProcessStepsSchema, TravelCnProcessStepsId, TravelCnProcessStepsName, TravelCnProcessStepsDesc, "travel-cn", "ProcessSteps"),
    createTemplateEntry(TravelCnRoadmap, TravelCnRoadmapSchema, TravelCnRoadmapId, TravelCnRoadmapName, TravelCnRoadmapDesc, "travel-cn", "Roadmap"),
    createTemplateEntry(TravelCnBarChart, TravelCnBarChartSchema, TravelCnBarChartId, TravelCnBarChartName, TravelCnBarChartDesc, "travel-cn", "BarChart"),
    createTemplateEntry(TravelCnPieDonut, TravelCnPieDonutSchema, TravelCnPieDonutId, TravelCnPieDonutName, TravelCnPieDonutDesc, "travel-cn", "PieDonut"),
    createTemplateEntry(TravelCnLineChart, TravelCnLineChartSchema, TravelCnLineChartId, TravelCnLineChartName, TravelCnLineChartDesc, "travel-cn", "LineChart"),
    createTemplateEntry(TravelCnDataTable, TravelCnDataTableSchema, TravelCnDataTableId, TravelCnDataTableName, TravelCnDataTableDesc, "travel-cn", "DataTable"),
    createTemplateEntry(TravelCnImageLeft, TravelCnImageLeftSchema, TravelCnImageLeftId, TravelCnImageLeftName, TravelCnImageLeftDesc, "travel-cn", "ImageLeft"),
    createTemplateEntry(TravelCnImageRight, TravelCnImageRightSchema, TravelCnImageRightId, TravelCnImageRightName, TravelCnImageRightDesc, "travel-cn", "ImageRight"),
    createTemplateEntry(TravelCnFullBleedImage, TravelCnFullBleedImageSchema, TravelCnFullBleedImageId, TravelCnFullBleedImageName, TravelCnFullBleedImageDesc, "travel-cn", "FullBleedImage"),
    createTemplateEntry(TravelCnQuote, TravelCnQuoteSchema, TravelCnQuoteId, TravelCnQuoteName, TravelCnQuoteDesc, "travel-cn", "Quote"),
    createTemplateEntry(TravelCnTeamGrid, TravelCnTeamGridSchema, TravelCnTeamGridId, TravelCnTeamGridName, TravelCnTeamGridDesc, "travel-cn", "TeamGrid"),
    createTemplateEntry(TravelCnClosing, TravelCnClosingSchema, TravelCnClosingId, TravelCnClosingName, TravelCnClosingDesc, "travel-cn", "Closing"),
];

export const manufacturingCnTemplates: TemplateWithData[] = [
    createTemplateEntry(ManufacturingCnCover, ManufacturingCnCoverSchema, ManufacturingCnCoverId, ManufacturingCnCoverName, ManufacturingCnCoverDesc, "manufacturing-cn", "Cover"),
    createTemplateEntry(ManufacturingCnTableOfContents, ManufacturingCnTableOfContentsSchema, ManufacturingCnTableOfContentsId, ManufacturingCnTableOfContentsName, ManufacturingCnTableOfContentsDesc, "manufacturing-cn", "TableOfContents"),
    createTemplateEntry(ManufacturingCnSectionDivider, ManufacturingCnSectionDividerSchema, ManufacturingCnSectionDividerId, ManufacturingCnSectionDividerName, ManufacturingCnSectionDividerDesc, "manufacturing-cn", "SectionDivider"),
    createTemplateEntry(ManufacturingCnBigStatement, ManufacturingCnBigStatementSchema, ManufacturingCnBigStatementId, ManufacturingCnBigStatementName, ManufacturingCnBigStatementDesc, "manufacturing-cn", "BigStatement"),
    createTemplateEntry(ManufacturingCnThreePoints, ManufacturingCnThreePointsSchema, ManufacturingCnThreePointsId, ManufacturingCnThreePointsName, ManufacturingCnThreePointsDesc, "manufacturing-cn", "ThreePoints"),
    createTemplateEntry(ManufacturingCnFourFeatures, ManufacturingCnFourFeaturesSchema, ManufacturingCnFourFeaturesId, ManufacturingCnFourFeaturesName, ManufacturingCnFourFeaturesDesc, "manufacturing-cn", "FourFeatures"),
    createTemplateEntry(ManufacturingCnIconList, ManufacturingCnIconListSchema, ManufacturingCnIconListId, ManufacturingCnIconListName, ManufacturingCnIconListDesc, "manufacturing-cn", "IconList"),
    createTemplateEntry(ManufacturingCnKpiMetrics, ManufacturingCnKpiMetricsSchema, ManufacturingCnKpiMetricsId, ManufacturingCnKpiMetricsName, ManufacturingCnKpiMetricsDesc, "manufacturing-cn", "KpiMetrics"),
    createTemplateEntry(ManufacturingCnComparison, ManufacturingCnComparisonSchema, ManufacturingCnComparisonId, ManufacturingCnComparisonName, ManufacturingCnComparisonDesc, "manufacturing-cn", "Comparison"),
    createTemplateEntry(ManufacturingCnTimeline, ManufacturingCnTimelineSchema, ManufacturingCnTimelineId, ManufacturingCnTimelineName, ManufacturingCnTimelineDesc, "manufacturing-cn", "Timeline"),
    createTemplateEntry(ManufacturingCnProcessSteps, ManufacturingCnProcessStepsSchema, ManufacturingCnProcessStepsId, ManufacturingCnProcessStepsName, ManufacturingCnProcessStepsDesc, "manufacturing-cn", "ProcessSteps"),
    createTemplateEntry(ManufacturingCnRoadmap, ManufacturingCnRoadmapSchema, ManufacturingCnRoadmapId, ManufacturingCnRoadmapName, ManufacturingCnRoadmapDesc, "manufacturing-cn", "Roadmap"),
    createTemplateEntry(ManufacturingCnBarChart, ManufacturingCnBarChartSchema, ManufacturingCnBarChartId, ManufacturingCnBarChartName, ManufacturingCnBarChartDesc, "manufacturing-cn", "BarChart"),
    createTemplateEntry(ManufacturingCnPieDonut, ManufacturingCnPieDonutSchema, ManufacturingCnPieDonutId, ManufacturingCnPieDonutName, ManufacturingCnPieDonutDesc, "manufacturing-cn", "PieDonut"),
    createTemplateEntry(ManufacturingCnLineChart, ManufacturingCnLineChartSchema, ManufacturingCnLineChartId, ManufacturingCnLineChartName, ManufacturingCnLineChartDesc, "manufacturing-cn", "LineChart"),
    createTemplateEntry(ManufacturingCnDataTable, ManufacturingCnDataTableSchema, ManufacturingCnDataTableId, ManufacturingCnDataTableName, ManufacturingCnDataTableDesc, "manufacturing-cn", "DataTable"),
    createTemplateEntry(ManufacturingCnImageLeft, ManufacturingCnImageLeftSchema, ManufacturingCnImageLeftId, ManufacturingCnImageLeftName, ManufacturingCnImageLeftDesc, "manufacturing-cn", "ImageLeft"),
    createTemplateEntry(ManufacturingCnImageRight, ManufacturingCnImageRightSchema, ManufacturingCnImageRightId, ManufacturingCnImageRightName, ManufacturingCnImageRightDesc, "manufacturing-cn", "ImageRight"),
    createTemplateEntry(ManufacturingCnFullBleedImage, ManufacturingCnFullBleedImageSchema, ManufacturingCnFullBleedImageId, ManufacturingCnFullBleedImageName, ManufacturingCnFullBleedImageDesc, "manufacturing-cn", "FullBleedImage"),
    createTemplateEntry(ManufacturingCnQuote, ManufacturingCnQuoteSchema, ManufacturingCnQuoteId, ManufacturingCnQuoteName, ManufacturingCnQuoteDesc, "manufacturing-cn", "Quote"),
    createTemplateEntry(ManufacturingCnTeamGrid, ManufacturingCnTeamGridSchema, ManufacturingCnTeamGridId, ManufacturingCnTeamGridName, ManufacturingCnTeamGridDesc, "manufacturing-cn", "TeamGrid"),
    createTemplateEntry(ManufacturingCnClosing, ManufacturingCnClosingSchema, ManufacturingCnClosingId, ManufacturingCnClosingName, ManufacturingCnClosingDesc, "manufacturing-cn", "Closing"),
];

export const allLayouts: TemplateWithData[] = [
    ...businessCnTemplates,
    ...techCnTemplates,
    ...medicalCnTemplates,
    ...educationCnTemplates,
    ...foodCnTemplates,
    ...financeCnTemplates,
    ...govCnTemplates,
    ...realestateCnTemplates,
    ...cultureCnTemplates,
    ...greenCnTemplates,
    ...retailCnTemplates,
    ...travelCnTemplates,
    ...manufacturingCnTemplates,
];

export const templates: TemplateLayoutsWithSettings[] = [
    {
        id: "business-cn",
        name: "企业商务",
        description: businessCnSettings.description,
        settings: businessCnSettings as TemplateGroupSettings,
        layouts: businessCnTemplates,
    },
    {
        id: "tech-cn",
        name: "科技互联网",
        description: techCnSettings.description,
        settings: techCnSettings as TemplateGroupSettings,
        layouts: techCnTemplates,
    },
    {
        id: "medical-cn",
        name: "医疗健康",
        description: medicalCnSettings.description,
        settings: medicalCnSettings as TemplateGroupSettings,
        layouts: medicalCnTemplates,
    },
    {
        id: "education-cn",
        name: "教育培训",
        description: educationCnSettings.description,
        settings: educationCnSettings as TemplateGroupSettings,
        layouts: educationCnTemplates,
    },
    {
        id: "food-cn",
        name: "美食餐饮",
        description: foodCnSettings.description,
        settings: foodCnSettings as TemplateGroupSettings,
        layouts: foodCnTemplates,
    },
    {
        id: "finance-cn",
        name: "金融投资",
        description: financeCnSettings.description,
        settings: financeCnSettings as TemplateGroupSettings,
        layouts: financeCnTemplates,
    },
    {
        id: "gov-cn",
        name: "党政政务",
        description: govCnSettings.description,
        settings: govCnSettings as TemplateGroupSettings,
        layouts: govCnTemplates,
    },
    {
        id: "realestate-cn",
        name: "房产建筑",
        description: realestateCnSettings.description,
        settings: realestateCnSettings as TemplateGroupSettings,
        layouts: realestateCnTemplates,
    },
    {
        id: "culture-cn",
        name: "国潮文创",
        description: cultureCnSettings.description,
        settings: cultureCnSettings as TemplateGroupSettings,
        layouts: cultureCnTemplates,
    },
    {
        id: "green-cn",
        name: "新能源环保",
        description: greenCnSettings.description,
        settings: greenCnSettings as TemplateGroupSettings,
        layouts: greenCnTemplates,
    },
    {
        id: "retail-cn",
        name: "电商新零售",
        description: retailCnSettings.description,
        settings: retailCnSettings as TemplateGroupSettings,
        layouts: retailCnTemplates,
    },
    {
        id: "travel-cn",
        name: "旅游文旅",
        description: travelCnSettings.description,
        settings: travelCnSettings as TemplateGroupSettings,
        layouts: travelCnTemplates,
    },
    {
        id: "manufacturing-cn",
        name: "智能制造",
        description: manufacturingCnSettings.description,
        settings: manufacturingCnSettings as TemplateGroupSettings,
        layouts: manufacturingCnTemplates,
    },
];

// Helper to get templates by group ID
export function getTemplatesByTemplateName(templateId: string): TemplateWithData[] {
    const template = templates.find((t) => t.id === templateId);
    return template?.layouts || [];
}

export function getSchemaByTemplateId(templateId: string): any {
    const template = templates.find((t) => t.id === templateId);
    return template?.layouts.map(t => {
        return {
            id: t.layoutId,
            name: t.layoutName,
            description: t.layoutDescription,
            json_schema: t.schemaJSON,
        }
    }) || {};
}
export function getSettingsByTemplateId(templateId: string): TemplateGroupSettings | undefined {
    const template = templates.find((t) => t.id === templateId);
    return template?.settings || undefined;
}
// Helper to get template by layout ID
export function getTemplateByLayoutId(layoutId: string): TemplateWithData | undefined {
    return allLayouts.find((t) => t.layoutId === layoutId);
}
export function getLayoutByLayoutId(layout: string, layoutGroup?: string): TemplateWithData | undefined {
    const templateName = layout.split(':')[0]
    const template = templates.find((t) => t.id === templateName)

    if (template) {
        return template.layouts.find((t) => t.layoutId === layout);
    }

    // Backward compatibility: persisted slides from fallback schema API may
    // store raw IDs like "general-intro-slide" (without "<group>:").
    if (layoutGroup) {
        const groupTemplate = templates.find((t) => t.id === layoutGroup);
        const qualifiedLayoutId = `${layoutGroup}:${layout}`;
        return groupTemplate?.layouts.find((t) => t.layoutId === qualifiedLayoutId);
    }

    return allLayouts.find((t) => t.layoutId.endsWith(`:${layout}`));
}
