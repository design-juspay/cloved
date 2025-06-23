import { useMemo } from "react";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  type TooltipProps,
  Area,
  AreaChart,
} from "recharts";
import { ArrowDown, ArrowUp, CircleHelp } from "lucide-react";
import { Tooltip } from "../Tooltip";
import Block from "../Primitives/Block/Block";
import Text from "../Text/Text";
import { ChangeType, StatCardVariant, type StatCardProps } from "./types";
import { FOUNDATION_THEME } from "../../tokens";

const StatCard = ({
  title,
  value,
  change,
  subtitle = "Last 7 days",
  variant,
  chartData,
  progressValue,
  titleIcon,
  actionIcon,
  helpIconText,
}: StatCardProps) => {
  const normalizedVariant =
    variant === StatCardVariant.PROGRESS_BAR ? "progress" : variant;

  const effectiveVariant =
    (variant === StatCardVariant.LINE || variant === StatCardVariant.BAR) &&
    (!chartData || chartData.length === 0)
      ? StatCardVariant.NUMBER
      : variant;

  const formattedChange = change ? (
    <Block display="flex" alignItems="center">
      {change.type === ChangeType.INCREASE ? (
        <ArrowUp size={14} style={{ marginRight: FOUNDATION_THEME.unit[2] }} />
      ) : (
        <ArrowDown
          size={14}
          style={{ marginRight: FOUNDATION_THEME.unit[2] }}
        />
      )}
      <Text>{Math.abs(change.value).toFixed(2)}%</Text>
    </Block>
  ) : null;

  const isTrendingDown = useMemo(() => {
    if (!chartData || chartData.length < 2) return false;
    return chartData[0].value > chartData[chartData.length - 1].value;
  }, [chartData]);

  const lineColor = isTrendingDown
    ? FOUNDATION_THEME.colors.red[500]
    : FOUNDATION_THEME.colors.green[500];
  const areaColor = isTrendingDown
    ? FOUNDATION_THEME.colors.red[500]
    : FOUNDATION_THEME.colors.green[500];

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (!active || !payload || payload.length === 0) return null;

    const currentValue = payload[0].value as number;
    const currentIndex = payload[0].payload?.index as number;
    const previousIndex = Math.max(0, currentIndex - 1);
    const previousValue = chartData?.[previousIndex]?.value || currentValue;

    const diff = currentValue - previousValue;
    const percentage = previousValue ? (diff / previousValue) * 100 : 0;
    const isUp = diff >= 0;

    return (
      <Block
        backgroundColor={FOUNDATION_THEME.colors.gray[1000]}
        padding={`${FOUNDATION_THEME.unit[4]} ${FOUNDATION_THEME.unit[8]}`}
        borderRadius={FOUNDATION_THEME.border.radius[4]}
      >
        <Text color={FOUNDATION_THEME.colors.gray[0]} variant="body.sm">
          {`${Math.abs(percentage).toFixed(0)}% ${isUp ? "Up" : "Down"}`}
        </Text>
      </Block>
    );
  };

  const indexedChartData = useMemo(() => {
    return chartData?.map((point, index) => ({
      ...point,
      index,
    }));
  }, [chartData]);

  return (
    <Block
      height="190px"
      border={`${FOUNDATION_THEME.border.width[1]} solid ${FOUNDATION_THEME.colors.gray[200]}`}
      borderRadius={FOUNDATION_THEME.border.radius[8]}
      overflow="hidden"
      backgroundColor={FOUNDATION_THEME.colors.gray[0]}
      boxShadow={FOUNDATION_THEME.shadows.xs}
      padding={FOUNDATION_THEME.unit[16]}
      display="flex"
      flexDirection="column"
      gap={FOUNDATION_THEME.unit[24]}
      data-statcard-variant={normalizedVariant}
    >
      {effectiveVariant !== StatCardVariant.NUMBER && (
        <Block
          display="flex"
          flexDirection="column"
          gap={FOUNDATION_THEME.unit[4]}
        >
          <Block
            display="flex"
            alignItems="flex-start"
            gap={FOUNDATION_THEME.unit[8]}
          >
            {titleIcon && (
              <Block
                width={FOUNDATION_THEME.unit[20]}
                height={FOUNDATION_THEME.unit[20]}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {titleIcon}
              </Block>
            )}
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              flexGrow={1}
              gap={FOUNDATION_THEME.unit[8]}
            >
              <Text
                variant="body.md"
                fontWeight={FOUNDATION_THEME.font.weight[500]}
                color={FOUNDATION_THEME.colors.gray[400]}
              >
                {title}
              </Text>
              {helpIconText && (
                <Block flexShrink={0}>
                  <Tooltip content={helpIconText}>
                    <CircleHelp
                      width={16}
                      height={16}
                      color={FOUNDATION_THEME.colors.gray[400]}
                    />
                  </Tooltip>
                </Block>
              )}
            </Block>
            {actionIcon && (
              <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                {actionIcon}
              </Block>
            )}
          </Block>

          <Block
            display="flex"
            flexDirection="column"
            alignItems="flex-start"
            paddingLeft={titleIcon ? FOUNDATION_THEME.unit[28] : "0"}
          >
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              gap={FOUNDATION_THEME.unit[4]}
            >
              <Text
                variant="heading.lg"
                fontWeight={FOUNDATION_THEME.font.weight[600]}
                color={FOUNDATION_THEME.colors.gray[800]}
              >
                {value}
              </Text>
              {formattedChange && (
                <Block marginLeft={FOUNDATION_THEME.unit[8]}>
                  <Text
                    color={
                      change?.type === ChangeType.INCREASE
                        ? FOUNDATION_THEME.colors.green[600]
                        : FOUNDATION_THEME.colors.red[600]
                    }
                    variant="body.sm"
                    fontWeight={FOUNDATION_THEME.font.weight[600]}
                  >
                    {formattedChange}
                  </Text>
                </Block>
              )}
            </Block>
            <Text
              variant="body.sm"
              color={FOUNDATION_THEME.colors.gray[400]}
              fontWeight={FOUNDATION_THEME.font.weight[500]}
            >
              {subtitle}
            </Text>
          </Block>
        </Block>
      )}

      {effectiveVariant === StatCardVariant.NUMBER && (
        <Block
          display="flex"
          flexDirection="column"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Block
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={FOUNDATION_THEME.unit[16]}
          >
            {titleIcon && (
              <Block
                display="flex"
                alignItems="center"
                justifyContent="center"
                flexShrink={0}
              >
                {titleIcon}
              </Block>
            )}
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              flexGrow={1}
              gap={FOUNDATION_THEME.unit[8]}
            >
              <Text
                variant="body.md"
                fontWeight={FOUNDATION_THEME.font.weight[500]}
                color={FOUNDATION_THEME.colors.gray[400]}
              >
                {title}
              </Text>
              {helpIconText && (
                <Block>
                  <Tooltip content={helpIconText}>
                    <CircleHelp
                      width={16}
                      height={16}
                      color={FOUNDATION_THEME.colors.gray[400]}
                    />
                  </Tooltip>
                </Block>
              )}
            </Block>
          </Block>

          <Block display="flex" flexDirection="column" alignItems="center">
            <Block
              width="100%"
              display="flex"
              alignItems="center"
              gap={FOUNDATION_THEME.unit[4]}
            >
              <Text
                variant="heading.xl"
                fontWeight={FOUNDATION_THEME.font.weight[600]}
                color={FOUNDATION_THEME.colors.gray[800]}
              >
                {value}
              </Text>
              {formattedChange && (
                <Block marginLeft={FOUNDATION_THEME.unit[8]}>
                  <Text
                    color={
                      change?.type === ChangeType.INCREASE
                        ? FOUNDATION_THEME.colors.green[600]
                        : FOUNDATION_THEME.colors.red[600]
                    }
                    variant="body.sm"
                    fontWeight={FOUNDATION_THEME.font.weight[600]}
                  >
                    {formattedChange}
                  </Text>
                </Block>
              )}
            </Block>
            <Text
              variant="body.sm"
              color={FOUNDATION_THEME.colors.gray[400]}
              fontWeight={FOUNDATION_THEME.font.weight[500]}
            >
              {subtitle}
            </Text>
          </Block>
        </Block>
      )}

      {effectiveVariant !== StatCardVariant.NUMBER && (
        <Block height="50px">
          {effectiveVariant === StatCardVariant.LINE && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={indexedChartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{
                    strokeDasharray: "6 5",
                    stroke: FOUNDATION_THEME.colors.gray[400],
                  }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                  animationDuration={350}
                />
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={areaColor} stopOpacity={0.2} />
                    <stop
                      offset="100%"
                      stopColor={FOUNDATION_THEME.colors.gray[0]}
                      stopOpacity={0.5}
                    />
                  </linearGradient>
                </defs>

                <Area
                  animationDuration={350}
                  type="monotone"
                  dataKey="value"
                  stroke={lineColor}
                  strokeWidth={2}
                  fill={`url(#colorGradient)`}
                  activeDot={{
                    r: 4,
                    fill: FOUNDATION_THEME.colors.gray[0],
                    stroke: lineColor,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.BAR && indexedChartData && (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={indexedChartData}
                margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis hide />
                <RechartsTooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "transparent" }}
                  position={{ y: 0 }}
                  isAnimationActive={false}
                />
                <Bar
                  dataKey="value"
                  fill={FOUNDATION_THEME.colors.primary[500]}
                  radius={[2, 2, 0, 0]}
                  isAnimationActive={false}
                  activeBar={{
                    fill: FOUNDATION_THEME.colors.primary[100],
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          )}

          {effectiveVariant === StatCardVariant.PROGRESS_BAR &&
            progressValue && (
              <Block
                width="100%"
                height={FOUNDATION_THEME.unit[20]}
                display="flex"
                alignItems="center"
                gap={FOUNDATION_THEME.unit[16]}
              >
                <Block
                  width="100%"
                  height="100%"
                  display="flex"
                  flexGrow={1}
                  borderRadius={FOUNDATION_THEME.border.radius[4]}
                  overflow="hidden"
                >
                  <Block
                    backgroundColor={FOUNDATION_THEME.colors.primary[500]}
                    height="100%"
                    width={`${progressValue}%`}
                  />
                  <Block
                    backgroundColor={FOUNDATION_THEME.colors.gray[0]}
                    height="100%"
                    backgroundImage={`repeating-linear-gradient(
                      to right,
                      ${FOUNDATION_THEME.colors.gray[200]},
                      ${FOUNDATION_THEME.colors.gray[200]} 5px,
                      transparent 1px,
                      transparent
                    )`}
                    backgroundSize={`${FOUNDATION_THEME.unit[10]} ${FOUNDATION_THEME.unit[10]}`}
                    style={{ width: `${100 - progressValue}%` }}
                  />
                </Block>
                <Text
                  variant="body.md"
                  fontWeight={FOUNDATION_THEME.font.weight[600]}
                  color={FOUNDATION_THEME.colors.gray[700]}
                >
                  {progressValue}%
                </Text>
              </Block>
            )}
        </Block>
      )}
    </Block>
  );
};

StatCard.displayName = "StatCard";

export default StatCard;
