import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOptions } from "@/types";
import { RotateCcw } from "lucide-react";

// Zod schema for form validation
const filterSchema = z
  .object({
    crypto: z.string(),
    city: z.string(),
    newsQuery: z.string(),
    minPrice: z.union([z.number().min(0), z.literal("")]).optional(),
    maxPrice: z.union([z.number().min(0), z.literal("")]).optional(),
  })
  .refine(
    (data) => {
      // Validate min price < max price when both are provided
      if (
        data.minPrice !== "" &&
        data.maxPrice !== "" &&
        typeof data.minPrice === "number" &&
        typeof data.maxPrice === "number"
      ) {
        return data.minPrice < data.maxPrice;
      }
      return true;
    },
    {
      message: "Min price must be less than max price",
      path: ["minPrice"],
    }
  );

type FilterFormData = z.infer<typeof filterSchema>;

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterFormData) => void;
  isLoading: boolean;
}

const CITY_OPTIONS = [
  { value: "Hanoi", label: "Hanoi" },
  { value: "New York", label: "New York" },
  { value: "London", label: "London" },
  { value: "Tokyo", label: "Tokyo" },
  { value: "Paris", label: "Paris" },
  { value: "Singapore", label: "Singapore" },
];

const CRYPTO_OPTIONS = [
  { value: "bitcoin", label: "Bitcoin (BTC)" },
  { value: "ethereum", label: "Ethereum (ETH)" },
  { value: "cardano", label: "Cardano (ADA)" },
  { value: "polkadot", label: "Polkadot (DOT)" },
  { value: "chainlink", label: "Chainlink (LINK)" },
  { value: "solana", label: "Solana (SOL)" },
];

const initData: FilterFormData = {
  crypto: "bitcoin",
  city: "Hanoi",
  newsQuery: "technology",
  minPrice: "",
  maxPrice: "",
};

export function FilterPanel({
  filters,
  onFiltersChange,
  isLoading,
}: FilterPanelProps) {
  const form = useForm<FilterFormData>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      crypto: filters.crypto || initData.crypto,
      city: filters.city || initData.city,
      newsQuery: filters.newsQuery || initData.newsQuery,
      minPrice: filters.minPrice || "",
      maxPrice: filters.maxPrice || "",
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { errors, isValid },
  } = form;

  // Watch price values to determine if crypto should be disabled
  const watchedMinPrice = watch("minPrice");
  const watchedMaxPrice = watch("maxPrice");
  const hasPriceRange =
    (watchedMinPrice !== "" && watchedMinPrice !== undefined) ||
    (watchedMaxPrice !== "" && watchedMaxPrice !== undefined);

  const onSubmit = (data: FilterFormData) => {
    onFiltersChange(data);
  };

  const handleReset = () => {
    reset(initData);
  };

  return (
    <Card className="gap-4">
      <CardHeader>
        <CardTitle>Data Filters</CardTitle>
        <CardDescription>Customize your dashboard data</CardDescription>
      </CardHeader>
      <CardContent className="">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 sm:space-y-6"
        >
          {/* Cryptocurrency Selection */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              Cryptocurrency
            </h4>
            <div className="flex flex-col space-y-2">
              <label className="text-xs sm:text-sm font-medium">
                Select Cryptocurrency
              </label>
              <Controller
                name="crypto"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    disabled={hasPriceRange || isLoading}
                  >
                    <SelectTrigger className="h-9 sm:h-10 w-full">
                      <SelectValue placeholder="Choose a cryptocurrency" />
                    </SelectTrigger>
                    <SelectContent>
                      {CRYPTO_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {hasPriceRange && (
                <p className="text-xs text-amber-600 mt-1">
                  Crypto selection is disabled when price range is set
                </p>
              )}
            </div>
          </div>

          {/* Crypto Price Range Filter */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              Cryptocurrency Price Range
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex flex-col space-y-2">
                <label
                  className="text-xs sm:text-sm font-medium"
                  htmlFor="minPrice"
                >
                  Min Price ($)
                </label>
                <Controller
                  name="minPrice"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      id="minPrice"
                      type="number"
                      className="h-9 sm:h-10"
                      value={value}
                      onChange={(e) => {
                        const val =
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value);
                        setValue("minPrice", val, {
                          shouldValidate: true,
                        });
                      }}
                      placeholder="0"
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.minPrice && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.minPrice.message}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-2">
                <label
                  className="text-xs sm:text-sm font-medium"
                  htmlFor="maxPrice"
                >
                  Max Price ($)
                </label>
                <Controller
                  name="maxPrice"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Input
                      id="maxPrice"
                      type="number"
                      className="h-9 sm:h-10"
                      onChange={(e) => {
                        const val =
                          e.target.value === ""
                            ? ""
                            : parseFloat(e.target.value);
                        setValue("maxPrice", val, {
                          shouldValidate: true,
                        });
                        trigger("minPrice");
                      }}
                      value={value}
                      placeholder="100000"
                      disabled={isLoading}
                    />
                  )}
                />
                {errors.maxPrice && (
                  <p className="text-xs text-red-600 mt-1">
                    {errors.maxPrice.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Weather City Filter */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              Weather
            </h4>
            <div className="flex flex-col space-y-2">
              <label className="text-xs sm:text-sm font-medium">
                Select City
              </label>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value || ""}
                    onValueChange={field.onChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger className="h-9 sm:h-10 w-full">
                      <SelectValue placeholder="Choose a city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITY_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          {/* News Keyword Search Filter */}
          <div className="space-y-2">
            <h4 className="font-semibold text-gray-900 text-sm sm:text-base">
              News
            </h4>
            <div className="flex flex-col space-y-2">
              <label className="text-xs sm:text-sm font-medium">
                Search by Keywords
              </label>
              <Input
                className="h-9 sm:h-10"
                {...form.register("newsQuery")}
                placeholder="Enter keywords (e.g., technology, business)..."
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap flex-col sm:flex-row gap-2 pt-4 border-t border-gray-200">
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
              disabled={isLoading}
              className="w-full sm:flex-1 h-9 sm:h-10 text-xs sm:text-sm"
            >
              <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Reset Filters
            </Button>
            <Button
              type="submit"
              disabled={isLoading || !isValid}
              className="w-full sm:flex-1 h-9 sm:h-10 text-xs sm:text-sm"
            >
              Apply Filters
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
