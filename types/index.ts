export enum SpO2Category {
    NORMAL = ">=94",
    BORDERLINE = "88-94",
    LOW = "<88"
}

export enum MobilityStatus {
    BEDRIDDEN = "Bedridden",
    WHEELCHAIR_BOUND = "Wheelchair-bound",
    WALKS_WITH_ASSISTANCE = "Walks with assistance",
    INDEPENDENT = "Independent"
}

export enum FeedingMethod {
    ORAL = "Oral",
    RYLES_TUBE = "Ryle’s tube",
    PEG_TUBE = "PEG tube"
}

export enum CaregiverAvailability {
    FULL_TIME = "Full-time",
    PART_TIME = "Part-time",
    NONE = "None"
}

export enum HomeLayout {
    SINGLE_FLOOR = "Single-floor",
    MULTI_FLOOR = "Multi-floor"
}