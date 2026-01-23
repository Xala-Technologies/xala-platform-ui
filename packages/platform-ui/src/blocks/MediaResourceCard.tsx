/**
 * MediaResourceCard
 *
 * A domain-neutral card component with prominent media display.
 * Enhanced variant of resource cards with focus on visual presentation.
 *
 * This component is designed to be used across any domain:
 * - Venues and facilities
 * - Products with images
 * - Portfolio items
 * - Property listings
 * - Event locations
 *
 * All text content is pre-localized - pass labels via props for i18n support.
 *
 * @example
 * ```tsx
 * <MediaResourceCard
 *   id="venue-123"
 *   title="Main Stadium"
 *   subtitle="Sports Venue"
 *   description="Professional sports facility with full amenities"
 *   image={{
 *     src: "/images/stadium.jpg",
 *     alt: "Main Stadium exterior view",
 *   }}
 *   badges={[
 *     { id: "1", text: "Indoor", variant: "neutral" },
 *     { id: "2", text: "Premium", variant: "accent" },
 *   ]}
 *   capacity={{ value: 5000, label: "capacity" }}
 *   location="Downtown District"
 *   onClick={(id) => navigate(`/venues/${id}`)}
 *   onFavorite={(id) => toggleFavorite(id)}
 * />
 * ```
 */
import * as React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import type { ResourceBadge, PriceDisplay, StatusIndicator } from '../patterns/types';

// ============================================================================
// Types
// ============================================================================

/** Image configuration (required for this component) */
export interface MediaResourceCardImage {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional height override in pixels (default: 200) */
  height?: number;
}

/** Capacity display configuration */
export interface MediaResourceCardCapacity {
  /** Numeric capacity value */
  value: number;
  /** Capacity label (pre-localized, e.g., "capacity", "seats", "guests") */
  label: string;
}

/** MediaResourceCard props interface */
export interface MediaResourceCardProps {
  /** Unique identifier */
  id: string;

  /** Primary title (pre-localized) */
  title: string;

  /** Secondary title/category (pre-localized, optional) */
  subtitle?: string;

  /** Description text (pre-localized, optional) */
  description?: string;

  /** Image configuration (required) */
  image: MediaResourceCardImage;

  /** Array of badges to display */
  badges?: ResourceBadge[];

  /** Maximum badges to show before "more" indicator */
  maxBadges?: number;

  /** "More" badges text (pre-localized, e.g., "+2 more") */
  moreBadgesLabel?: string;

  /** Capacity information */
  capacity?: MediaResourceCardCapacity;

  /** Location text (pre-localized) */
  location?: string;

  /** Status indicator */
  status?: StatusIndicator;

  /** Price display */
  price?: PriceDisplay;

  // ========== Event Handlers ==========

  /** Click handler for the card */
  onClick?: (id: string) => void;

  /** Favorite toggle handler */
  onFavorite?: (id: string) => void;

  /** Whether this item is favorited */
  isFavorited?: boolean;

  // ========== Display Options ==========

  /** Card variant */
  variant?: 'grid' | 'list' | 'featured';

  /** Show gradient overlay on image (default: true) */
  showGradientOverlay?: boolean;

  /** Custom class name */
  className?: string;

  // ========== Accessibility Labels ==========

  /** Aria label for favorite button (pre-localized) */
  favoriteAriaLabel?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const HeartIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MapPinIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Get status color based on type */
function getStatusColor(type: StatusIndicator['type']): string {
  const colors: Record<StatusIndicator['type'], string> = {
    available: 'var(--ds-color-success-base-default)',
    limited: 'var(--ds-color-warning-base-default)',
    unavailable: 'var(--ds-color-danger-base-default)',
    pending: 'var(--ds-color-info-base-default)',
    confirmed: 'var(--ds-color-success-base-default)',
  };
  return colors[type] || 'var(--ds-color-neutral-base-default)';
}

/** Get badge color CSS variable */
function getBadgeColor(variant: ResourceBadge['variant'] = 'neutral'): {
  bg: string;
  text: string;
} {
  const colors: Record<NonNullable<ResourceBadge['variant']>, { bg: string; text: string }> = {
    neutral: {
      bg: 'var(--ds-color-neutral-surface-hover)',
      text: 'var(--ds-color-neutral-text-default)',
    },
    accent: {
      bg: 'var(--ds-color-accent-surface-default)',
      text: 'var(--ds-color-accent-text-default)',
    },
    success: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
    },
    warning: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
    },
    danger: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
    info: {
      bg: 'var(--ds-color-info-surface-default)',
      text: 'var(--ds-color-info-text-default)',
    },
  };
  return colors[variant];
}

// ============================================================================
// Sub-components
// ============================================================================

/** Badge component */
interface BadgeProps {
  badge: ResourceBadge;
}

function Badge({ badge }: BadgeProps) {
  const colors = getBadgeColor(badge.variant);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-1)',
        padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
        fontSize: 'var(--ds-font-size-xs)',
        fontWeight: 500,
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 'var(--ds-border-radius-md)',
        whiteSpace: 'nowrap',
      }}
    >
      {badge.icon && (
        <span style={{ display: 'inline-flex', alignItems: 'center' }}>{badge.icon}</span>
      )}
      {badge.text}
    </span>
  );
}

/** Favorite button component */
interface FavoriteButtonProps {
  isFavorited: boolean;
  onClick: (e: React.MouseEvent) => void;
  ariaLabel?: string;
}

function FavoriteButton({ isFavorited, onClick, ariaLabel }: FavoriteButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel || (isFavorited ? 'Remove from favorites' : 'Add to favorites')}
      aria-pressed={isFavorited}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'var(--ds-spacing-10)',
        height: 'var(--ds-spacing-10)',
        border: 'none',
        borderRadius: 'var(--ds-border-radius-full)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        color: isFavorited
          ? 'var(--ds-color-danger-base-default)'
          : 'var(--ds-color-neutral-text-subtle)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: 'var(--ds-shadow-sm)',
      }}
    >
      <HeartIcon filled={isFavorited} />
    </button>
  );
}

/** Price display component */
interface PriceDisplayComponentProps {
  price: PriceDisplay;
}

function PriceDisplayComponent({ price }: PriceDisplayComponentProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--ds-spacing-1)',
      }}
    >
      {price.strikethrough && (
        <span
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
            textDecoration: 'line-through',
          }}
        >
          {price.strikethrough}
        </span>
      )}
      {price.prefix && (
        <span
          style={{
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {price.prefix}
        </span>
      )}
      <span
        style={{
          fontSize: 'var(--ds-font-size-lg)',
          fontWeight: 700,
          color: 'var(--ds-color-neutral-text-default)',
        }}
      >
        {price.amount}
      </span>
      {price.unit && (
        <span
          style={{
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {price.unit}
        </span>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function MediaResourceCard({
  id,
  title,
  subtitle,
  description,
  image,
  badges = [],
  maxBadges = 3,
  moreBadgesLabel,
  capacity,
  location,
  status,
  price,
  onClick,
  onFavorite,
  isFavorited = false,
  variant = 'grid',
  showGradientOverlay = true,
  className,
  favoriteAriaLabel,
}: MediaResourceCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onFavorite) {
      onFavorite(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(id);
    }
  };

  const isClickable = !!onClick;
  const visibleBadges = badges.slice(0, maxBadges);
  const remainingBadges = badges.length - maxBadges;
  const imageHeight = image.height || 200;

  // List variant
  if (variant === 'list') {
    return (
      <div
        className={cn('media-resource-card media-resource-card--list', className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        style={{
          display: 'flex',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          overflow: 'hidden',
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          boxShadow: isHovered && isClickable ? 'var(--ds-shadow-md)' : 'var(--ds-shadow-sm)',
        }}
      >
        {/* Image */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            flexShrink: 0,
            overflow: 'hidden',
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            padding: 'var(--ds-spacing-4)',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 'var(--ds-spacing-3)',
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              {subtitle && (
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    marginBottom: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {subtitle}
                </Paragraph>
              )}
              <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                {title}
              </Heading>
            </div>

            {onFavorite && (
              <FavoriteButton
                isFavorited={isFavorited}
                onClick={handleFavorite}
                ariaLabel={favoriteAriaLabel}
              />
            )}
          </div>

          {/* Description */}
          {description && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {description}
            </Paragraph>
          )}

          {/* Metadata row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-4)',
              flexWrap: 'wrap',
            }}
          >
            {location && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              >
                <MapPinIcon size={14} />
                <span>{location}</span>
              </div>
            )}
            {capacity && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              >
                <UsersIcon size={14} />
                <span>
                  {capacity.value.toLocaleString()} {capacity.label}
                </span>
              </div>
            )}
            {status && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              >
                <span
                  style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: 'var(--ds-border-radius-full)',
                    backgroundColor: getStatusColor(status.type),
                  }}
                />
                <span style={{ color: getStatusColor(status.type), fontWeight: 500 }}>
                  {status.label}
                </span>
              </div>
            )}
          </div>

          {/* Footer: Badges and Price */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
            }}
          >
            {/* Badges */}
            {badges.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
                {visibleBadges.map((badge) => (
                  <Badge key={badge.id} badge={badge} />
                ))}
                {remainingBadges > 0 && moreBadgesLabel && (
                  <span
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      alignSelf: 'center',
                    }}
                  >
                    {moreBadgesLabel}
                  </span>
                )}
              </div>
            )}

            {/* Price */}
            {price && <PriceDisplayComponent price={price} />}
          </div>
        </div>
      </div>
    );
  }

  // Featured variant
  if (variant === 'featured') {
    return (
      <div
        className={cn('media-resource-card media-resource-card--featured', className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        style={{
          position: 'relative',
          borderRadius: 'var(--ds-border-radius-xl)',
          overflow: 'hidden',
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
          boxShadow: isHovered && isClickable ? 'var(--ds-shadow-xl)' : 'var(--ds-shadow-md)',
          transform: isHovered && isClickable ? 'scale(1.02)' : 'none',
        }}
      >
        {/* Full-bleed image */}
        <img
          src={image.src}
          alt={image.alt}
          style={{
            width: '100%',
            height: `${imageHeight * 1.5}px`,
            objectFit: 'cover',
          }}
        />

        {/* Gradient overlay */}
        {showGradientOverlay && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '70%',
              background:
                'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Top actions */}
        <div
          style={{
            position: 'absolute',
            top: 'var(--ds-spacing-4)',
            left: 'var(--ds-spacing-4)',
            right: 'var(--ds-spacing-4)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          {/* Badges */}
          {badges.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
              {visibleBadges.map((badge) => (
                <Badge key={badge.id} badge={badge} />
              ))}
            </div>
          )}

          {/* Favorite */}
          {onFavorite && (
            <FavoriteButton
              isFavorited={isFavorited}
              onClick={handleFavorite}
              ariaLabel={favoriteAriaLabel}
            />
          )}
        </div>

        {/* Bottom content */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 'var(--ds-spacing-5)',
            color: 'var(--ds-color-neutral-background-default)',
          }}
        >
          {subtitle && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                marginBottom: 'var(--ds-spacing-1)',
                opacity: 0.8,
              }}
            >
              {subtitle}
            </Paragraph>
          )}
          <Heading
            level={3}
            data-size="md"
            style={{ margin: 0, color: 'var(--ds-color-neutral-background-default)' }}
          >
            {title}
          </Heading>

          {/* Metadata row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-4)',
              marginTop: 'var(--ds-spacing-3)',
              flexWrap: 'wrap',
            }}
          >
            {location && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  opacity: 0.9,
                }}
              >
                <MapPinIcon size={14} />
                <span>{location}</span>
              </div>
            )}
            {capacity && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  fontSize: 'var(--ds-font-size-sm)',
                  opacity: 0.9,
                }}
              >
                <UsersIcon size={14} />
                <span>
                  {capacity.value.toLocaleString()} {capacity.label}
                </span>
              </div>
            )}
            {price && (
              <div
                style={{
                  marginLeft: 'auto',
                  fontSize: 'var(--ds-font-size-lg)',
                  fontWeight: 700,
                }}
              >
                {price.prefix && <span style={{ opacity: 0.8 }}>{price.prefix} </span>}
                {price.amount}
                {price.unit && <span style={{ opacity: 0.8 }}> {price.unit}</span>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Default grid variant
  return (
    <div
      className={cn('media-resource-card media-resource-card--grid', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderRadius: 'var(--ds-border-radius-xl)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        overflow: 'hidden',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: isHovered && isClickable ? 'var(--ds-shadow-md)' : 'var(--ds-shadow-sm)',
        transform: isHovered && isClickable ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Image section */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${imageHeight}px`,
          overflow: 'hidden',
        }}
      >
        <img
          src={image.src}
          alt={image.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            transform: isHovered && isClickable ? 'scale(1.05)' : 'none',
          }}
        />

        {/* Gradient overlay */}
        {showGradientOverlay && (
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
              pointerEvents: 'none',
            }}
          />
        )}

        {/* Badges overlay */}
        {badges.length > 0 && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--ds-spacing-3)',
              left: 'var(--ds-spacing-3)',
              display: 'flex',
              gap: 'var(--ds-spacing-2)',
              flexWrap: 'wrap',
              maxWidth: 'calc(100% - var(--ds-spacing-12))',
            }}
          >
            {visibleBadges.map((badge) => (
              <Badge key={badge.id} badge={badge} />
            ))}
            {remainingBadges > 0 && moreBadgesLabel && (
              <span
                style={{
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 500,
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  color: 'var(--ds-color-neutral-text-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                {moreBadgesLabel}
              </span>
            )}
          </div>
        )}

        {/* Favorite button overlay */}
        {onFavorite && (
          <div
            style={{
              position: 'absolute',
              top: 'var(--ds-spacing-3)',
              right: 'var(--ds-spacing-3)',
            }}
          >
            <FavoriteButton
              isFavorited={isFavorited}
              onClick={handleFavorite}
              ariaLabel={favoriteAriaLabel}
            />
          </div>
        )}

        {/* Status indicator overlay */}
        {status && (
          <div
            style={{
              position: 'absolute',
              bottom: 'var(--ds-spacing-3)',
              left: 'var(--ds-spacing-3)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-neutral-background-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              fontSize: 'var(--ds-font-size-xs)',
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: getStatusColor(status.type),
              }}
            />
            <span style={{ color: getStatusColor(status.type) }}>{status.label}</span>
          </div>
        )}
      </div>

      {/* Content section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        {/* Header */}
        <div>
          {subtitle && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                marginBottom: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {subtitle}
            </Paragraph>
          )}
          <Heading level={3} data-size="sm" style={{ margin: 0 }}>
            {title}
          </Heading>
        </div>

        {/* Description */}
        {description && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-subtle)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Paragraph>
        )}

        {/* Metadata row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            flexWrap: 'wrap',
          }}
        >
          {location && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              <MapPinIcon size={14} />
              <span>{location}</span>
            </div>
          )}
          {capacity && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              <UsersIcon size={14} />
              <span>
                {capacity.value.toLocaleString()} {capacity.label}
              </span>
            </div>
          )}
        </div>

        {/* Price */}
        {price && (
          <div style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <PriceDisplayComponent price={price} />
          </div>
        )}
      </div>
    </div>
  );
}

export default MediaResourceCard;
